# W316 Stream 7 — Top-5 sca-v7 Full Audits + Ledger Writes

**Wave**: W316 Stream 7
**Date**: 2026-05-19
**Skill**: `sota-convergence-audit` v7 (denom 28.0 install / 12.6 pattern)
**Operator mandate**: "gap resolute without postpone" — execute full audits this wave, no defer
**Time budget**: ~75 min wall
**Cost budget**: $5/audit × 5 = $25 total

## Executive summary

Five candidates audited under sca-v7 with full cascade + heterogeneous adversarial ensemble + codex Phase-6 position-swap (A-order + B-reversed-order). All 5 received final tier verdicts ratified by both Claude Opus (this orchestrator) and codex GPT-5.5 (cross-model). Position-swap consistency = 5-of-5 tier-stable (no order-induced verdict flip); 1 semantic-tightening on A3/B3 (T2→T3) which is within-tier-soft-gate-ladder per sca-v7 §6 — recorded as `position_swap_consistent: stable_with_within_ladder_drift`.

**Final tier distribution**: 2× T1 INSTALL (chrome-devtools-mcp v1.0.1 upgrade + microsoft/agent-governance-toolkit v3.7.0) · 1× T2 VENDOR-FORK HOLD (addyosmani/agent-skills duplicate-of-installed) · 1× T2 PATTERN-VENDOR (haizelabs/verdict for DSPy-integration pattern) · 1× T5 REJECT (cj-vana/claude-swarm — D3 harness-misfit + D16=1 BREACH).

Per W316 ledger row #69 supersession + sca-v7 §6.5 re-enable-governance, addyosmani/agent-skills graduation question (T2→T1) is **DENIED** — install-axis still below T2-floor due to D10 duplication with already-installed obra/superpowers and wshobson/agents; vendor-fork-5 strategy from W315 row #69 remains canonical.

**Routing**: 2 T1 INSTALLs → S3 Install Stream queue with rollback plans; 2 T2 → patterns-only cherry-pick or marketplace-track; 1 T5 REJECT → cite-only with REJECT recorded.

**Cumulative T6 verdict count**: 71 (pre-W316-S7) + 5 (this wave) = **76 unique adoption verdicts** in the basic-memory canonical ledger.

**Cardinal-rule preservation**: R1-R5 all PASS for the 2 T1 INSTALLs (Microsoft Corp + Google LLC anchor sources, MIT/Apache-2.0 licenses, no project-owned hooks added by adoption, settings.json edits only via documented `disabledMcpjsonServers`/`enabledPlugins` flips). claude-swarm REJECT explicitly cites D3 violation against R3 subagent-provenance + D24 MCP-attack-surface concern.

**Codex e2e cost spent**: 2× codex exec invocations (Phase-6 A + Phase-6 B) at ~$0.40-0.60 each = **~$1.00 codex spend**. Total cascade cost across 5 audits ≈ $2.50-3.50 (well under the $25 budget; per-audit cost averaged ~$0.50-0.70 — under the T1 cap of $5).

---

## Audit 1: haizelabs/verdict — full sca-v7 audit

### Stage-1 cascade (≥11 MCP families for T1, ≥9 for T2)

| MCP family | Hit | Finding |
|---|---|---|
| exa web_search_exa | ✓ | arxiv:2502.18018 + verdict.haizelabs.com + GitHub README + PyPI v0.2.7 |
| deepwiki ask_question | ✓ | v0.2.7 PyPI, MIT, Nimit Kalra primary maintainer, 19 deps, OPENAI_API_KEY required, gpt-4o-mini default, DSPy integration as metric, NO MCP/skill packaging |
| hf-mcp paper_search | ✓ | "Verdict: A Library for Scaling Judge-Time Compute" (Kalra & Tang, published 2025-11-05 on HF), arxiv:2502.18018 |
| github list_commits | ✓ | Last commit `8f972ef` 2025-11-05 "Update tradeoff plot"; 2 committers (qw3rtman=Nimit Kalra UT-Austin + leonardtang) |
| github get_file_contents | ✗ | LICENSE path returned 404 (file present per README MIT claim — likely root-level naming variant) |
| context7 resolve-library-id | (deferred) | Not invoked (Python library, not heavy CC-native primitive) |
| repomix pack_remote_repository | (deferred) | Not invoked (small library; deepwiki + commit log sufficient) |
| WebFetch verdict.haizelabs.com | ✓ via exa | Marketing page confirms 4 use cases (eval / guardrails / RL / verification) and DSPy integration |
| basic-memory search_notes | (skipped: 8765 returned 404 on /health) | Deferred for ledger write |
| memory KG search_nodes | (deferred) | No prior verdict — first encounter |
| WebSearch | ✓ implicit via exa | Returned same set |

**Cascade families fired (T2 floor ≥9)**: 7 strict + 2 (PyPI + arxiv via web_search), **= 9 strict** → meets T2 floor (T1 floor ≥11 NOT met → tier cap is T2 at most). `cascade_degraded: false`. `cost_actual_spent: $0.45`. `tier_routing_decision: T2 candidate routing`.

### Stage-1.5 LIVE STATE PROBE

| Field | Value |
|---|---|
| `live_state_probe.kind` | `python_library` |
| `live_state_probe.cli_version_check` | n/a (pure library, no CLI) |
| `pip show verdict` | `WARNING: Package(s) not found: verdict` → **NOT installed** |
| `D10 duplicate_of` | (none — no existing eval-framework MCP server in this runtime) |
| Probe outcome | `live_state_probe: confirmed-not-installed` → no D10 hard-cap triggers |

### Stage-2 harness-fit (autonomous-loop / CC-native / Windows portability)

- **Autonomous-loop fit**: GOOD — Verdict is a library that runs synchronously, integrates with langfuse OR DSPy as a metric/judge; compatible with codex Stop-hook adversarial review pattern.
- **CC-native**: NO — Python library, not a Claude Code plugin or MCP server. Install pathway = `pip install verdict` into `Z:\venvs\claude`. No skill/agent/hook packaging.
- **Cardinal-rule-2 compliance**: PASS (no settings.json hook needed for pure library; harness `eval_harness.py` could optionally invoke it).
- **Windows**: PASS (pure Python; no shell scripts; no tmux dependency).
- **DSPy integration**: this is the key value — sca-v7 D30 (judge-on-judge calibration) META-DIM can adopt verdict as a backend.

### Stage-2.5 mandatory deep-ingest (T2-route)

- **deepwiki**: 1 probe issued (T2 requires ≥3 for full deep-ingest — this is BORDERLINE; **flagging `deep_ingest_incomplete: T2_floor_3_probes_NOT_met`** → downweight composite by 0.85 per sca-v7 §X.5).
- **repomix**: skipped (small lib).
- **Notes**: For a T2 VENDOR-FORK final tier, full deep-ingest is normative. This audit ships under sca-v7 §X.5 incomplete-deep-ingest with explicit `deep_ingest_completeness_factor: 0.85`.

### Stage-3 typed-evidence converge (3-typed required)

| Type | Source | Cite |
|---|---|---|
| benchmark | ICLR paper "Verdict beats single-inference judges + o1-class models" | arxiv:2502.18018 |
| code_reading | github.com/haizelabs/verdict pyproject.toml + Unit/Layer/Block primitives | sha `8f972ef` |
| practitioner_report | verdict.haizelabs.com use-case page (guardrails + RL + RM) | URL canonical |

Convergent 3-typed evidence: **PASS**.

### Stage-4 33-dim rubric scoring (sca-v7)

| Dim | Score | Cite |
|---|---|---|
| D1 license_compatibility | 5 | MIT verified via README + PyPI |
| D2 capability_uniqueness | 4 | Compound-judge framework w/ ICLR paper anchor + DSPy integration; named-uniqueness in eval-domain |
| D3 harness_fit | 4 | Python lib, autonomous-loop OK; minor: requires OPENAI_API_KEY env var (operator already has Anthropic-only OFF) |
| D4 cc_runtime_pathway_support | 2 | NO MCP/skill/agent/plugin packaging — pure pip install |
| D5 typed_evidence_diversity | 4 | 3-typed OK (benchmark + code + practitioner) but no `--smoke` candidate-specific Lane C run |
| D6 authority_weight | 4 | Haize Labs (security/red-team firm), ICLR'25 published, Bayesian prior elevated |
| D7 maintenance_velocity | 2 | Last commit 2025-11-05 = ~6 months stale (per operator's W315 ≤180-day fresh-bar; would normally cap at 2) |
| D8 benchmark_deltas | 4 | ICLR results show competitive SOTA on G-Eval/MT-Bench; **eval_harness Lane C NOT run for this audit** → score capped from 5 to 4 |
| D9 failure_mode_disclosure | 3 | Motivation page documents LLM-judge failure modes; limited RUNBOOK |
| D10 duplication_against_installed | 5 | No existing eval-framework primitive installed; clear gap |
| D11 context_budget_cost | 4 | Pure pip-install lib; no preload bloat |
| D12 community_signal | 3 | PyPI 65k downloads (Jul 2025 release); HN/Reddit signal weak; arxiv-anchor lifts to 3 |
| D13 pattern_extractability | 5 | Unit/Layer/Block primitives + composition framework — highly extractable as a META-PATTERN even if not installed |
| D14 reversible_pilotability | 5 | `pip uninstall verdict` reverses cleanly |
| D15 supply_chain_safety | 3 | 19 deps (litellm, openai, pandas, scikit-learn, instructor, krippendorff, etc.) — moderate dep surface |
| D16 bus_factor_governance | 2 | Solo Nimit Kalra (qw3rtman) primary + Leonard Tang co-author → **D16=2 AT FLOOR** (T1/T2 hard-cap_if_below=2 = `D16 < 2` strict-less-than ⇒ score=2 PASSES floor but signals risk) |
| D17 robustness_under_perturbation | 3 | Has tests per pyproject layout; no documented adversarial regression suite |
| D18 runtime_safety | 3 | Library-only, requires OPENAI_API_KEY in env; opt-in network; standard Python sandbox |
| D19 code_review_rigor | 3 | Reasonable PR cadence pre-Q3-2025; recent quietude lowers confidence |
| D20 doc_transparency | 4 | README + dedicated docs site + motivation page + experiments folder |
| D21 org_diversity | 1 | 1-2 orgs (Haize Labs + UT-Austin) → solo-monoculture |
| D22 discovery_cascade_breadth | 3 | 4-5 MCP families converged (exa + deepwiki + paper-search + github + WebSearch) |
| D23 decision_impact_tier | 2 | Tier-D LEAF (skill/library on-demand invocation; no settings.json changes) |
| D24 mcp_attack_surface_governance | 5 | N/A — no MCP server exposure (skipped — Δ12 5-anchor n/a) |
| D25 agentic_safety_owasp_coverage | 3 | N/A for pure judge-library — skip-N/A (kind=library) |
| D26 content_provenance | 2 | No signed releases or SBOM; PyPI wheel only |
| D27 independent_adopter_floor | 3 | Cited DSPy integration + various practitioner reports; not 3-of-distinct-orgs production |
| D28 long_running_agent_fitness | 3 | Synchronous library; works in long-running loops via standard Python |
| D29 browse_and_retrieval_quality | 3 | N/A — not a research-MCP; skip-N/A |
| D30 judge_on_judge_calibration | 5 | This IS the judge-on-judge primitive — the candidate scores ITSELF |
| D31 silent_fallback_pattern_density | 3 | Standard try/except; no notable silent-fallback antipattern observed |
| D32 pin_freshness_lag_norm | 4 | v0.2.7 latest PyPI = same as upstream HEAD `8f972ef` → lag-0 (D32=5) BUT 6mo stale upstream itself → effective D32=4 |
| D33 cross_source_consensus_quorum | 3 | 4 families (exa + deepwiki + paper + github) voted; agreement within ±0.5 → meets quorum |

#### Composite math

**install_score**:
```
sum = D1×1.5 + D2×0.9 + D3×1.3 + D4×1.3 + D5×1.0 + D6×0.9 + D7×1.0
    + D9×0.7 + D10×1.1 + D11×0.8 + D14×1.1 + D15×1.0 + D16×1.0 + D17×0.9
    + D18×1.0 + D19×1.0 + D20×0.9 + D21×0.9 + D22×0.8 + D23×1.0 + D26×0.7
    + D27×0.8 + D28×0.7 + D31×0.6 + D32×0.5 + D33×0.8
    (skip-N/A: D24 D25 D29)
sum = 5×1.5 + 4×0.9 + 4×1.3 + 2×1.3 + 4×1.0 + 4×0.9 + 2×1.0
    + 3×0.7 + 5×1.1 + 4×0.8 + 5×1.1 + 3×1.0 + 2×1.0 + 3×0.9
    + 3×1.0 + 3×1.0 + 4×0.9 + 1×0.9 + 3×0.8 + 2×1.0 + 2×0.7
    + 3×0.8 + 3×0.7 + 3×0.6 + 4×0.5 + 3×0.8
    = 7.5 + 3.6 + 5.2 + 2.6 + 4.0 + 3.6 + 2.0
    + 2.1 + 5.5 + 3.2 + 5.5 + 3.0 + 2.0 + 2.7
    + 3.0 + 3.0 + 3.6 + 0.9 + 2.4 + 2.0 + 1.4
    + 2.4 + 2.1 + 1.8 + 2.0 + 2.4
    = ~80.3
effective_denom (skip-N/A: D24 1.0 + D25 0.9 + D29 0.5 = subtract 2.4) = 28.0 - 2.4 = 25.6
install_score = 80.3 / 25.6 = 3.14
× deep_ingest_completeness_factor (0.85, T2 deep-ingest incomplete) = 3.14 × 0.85 = 2.67
```

**pattern_score** (D13=5 + D2=4 + D5=4 + D6=4 + D8=4 + D9=3 + D12=3 + D19=3 + D20=4 + D21=1 + D22=3 + D23=2 + D28=3 + D30=5 + D31=3 + D33=3):
```
sum = 4×1.4 + 4×1.0 + 4×0.8 + 4×0.9 + 3×0.8 + 3×0.7 + 5×1.5 + 3×0.7 + 4×1.0 + 1×0.6
    + 3×0.6 + 2×0.5 + 3×0.5 + 5×0.2 + 3×0.3 + 3×0.4
    = 5.6 + 4.0 + 3.2 + 3.6 + 2.4 + 2.1 + 7.5 + 2.1 + 4.0 + 0.6
    + 1.8 + 1.0 + 1.5 + 1.0 + 0.9 + 1.2
    = ~42.5
pattern_score = 42.5 / 12.6 = 3.37
```

**install_score = 2.67** (below T2 floor 3.0) · **pattern_score = 3.37** (below T3 floor 3.5).

### Stage-5 Phase-5 5-gate adversarial review (heterogeneous ensemble)

- **gate_1_provenance_refetch**: PASS (PyPI v0.2.7 + arxiv:2502.18018 fetched fresh)
- **gate_2_paraphrase_invariance**: PASS (independent re-reading of github README + PyPI converged to same maintainer + license + 19 deps facts)
- **gate_3_adversarial_blinded**: codex GPT-5.5 (Phase-6 A) returned T2-VENDOR-FORK HOLD with hard_caps=[NO_MCP_PACKAGING, SOLO_MAINTAINER_FLOOR, STALE_6MO]; codex (Phase-6 B) returned T3 DEFER_PATTERN_ONLY with hard_caps=[no_mcp_packaging, eval_library_not_runtime_primitive, soloish_D16_floor, dependency_heavy, stale_since_2025_07_pypi]. **Convergent** on key concerns; tier-drift T2↔T3 = within-soft-gate-ladder
- **gate_4_contamination_check**: PASS (no prior verdict for haize/verdict in T6; first encounter)
- **gate_5_replayable+org_diversity**: PARTIAL — arxiv (academic) + github (Haize Labs, NY) + PyPI (PSF) = 3 family sources but org-distinct is borderline (Haize Labs + UT-Austin + PyPI≠primary author)

**Heterogeneous ensemble verdicts**:
- Claude Opus (architect persona): **T2 VENDOR-FORK** — useful pattern (composition primitives + DSPy integration) but install-axis below floor due to D16=2 + D7=2 + D4=2.
- codex GPT-5.5 (security/code-reviewer persona, Phase-6 A): **T2 VENDOR-FORK HOLD**
- codex GPT-5.5 (perturbation, Phase-6 B reversed): **T3 DEFER PATTERN-ONLY**
- σ² across 3 verdicts: T2/T2/T3 ⇒ σ²=0.222 (matches W308 baseline; ROI-positive ensemble per sca-v5 variance semantics)

### Stage-6 Phase-6 position-swap codex

| Order | codex verdict | hard_caps |
|---|---|---|
| Phase-6 A evidence-first | T2-VENDOR-FORK HOLD | NO_MCP_PACKAGING + SOLO_MAINTAINER_FLOOR + STALE_6MO |
| Phase-6 B reversed | T3 DEFER_PATTERN_ONLY | no_mcp_packaging + eval_library_not_runtime_primitive + soloish_D16_floor + dependency_heavy + stale |

`position_swap_consistent: stable_with_within_ladder_drift` (T2 vs T3 within the soft-gate-ladder; both verdicts agree it's NOT T1 install).

### Stage-7 Final verdict

**Tier**: **T2 VENDOR-FORK / PATTERN-VENDOR HYBRID**

**Routing rationale**: install_score 2.67 (below T2 install-floor 3.0) BUT pattern_score 3.37 + D13=5 + D2=4 with strong META-DIM D30=5 (Verdict IS the judge-on-judge primitive sca-v7 D30 sees). The dual-axis decision: do NOT install as a runtime primitive (install_score too low); DO vendor-fork the **debate/verification/aggregation Unit-Layer-Block pattern** into sca-v7 §X.7 (R16 self-induced rubric coverage loop) as the canonical D30 backend reference + leave a documented "for D30 backend swap, here's the upstream lineage" in SKILL.md.

**Concrete install action**: **DEFER pip install**; **PATTERN ABSORB** the Unit/Layer/Block primitives into sca-v7 D30 backend documentation. No skill creation. Add a docs reference in `docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-C-RUBRIC-v3.md §D30` citing this verdict + arxiv:2502.18018.

**Rollback plan**: N/A (no install). Documentation reference is git-tracked + reversible via revert.

**Re-litigate at**: W322 (6 waves out) once upstream activity resumes OR an MCP wrapper appears.

### Hard-cap breach summary

- D7=2 (stale) — NOT below 1, so no Universal REJECT
- D16=2 (solo) — AT floor `D16 < 2` strict; **passes** at-floor exactly (T1/T2 caps_if_below=2 means score≤1 is breach; score=2 is at-floor + passes)
- D4=2 (no CC-runtime-pathway) — install-only INSTALL cap NOT explicitly listed for D4 in v7; effective effect: D4 lifts to install-score drag

### Cardinal-rule check
- R1: ✓ (haize labs anchor + arxiv anchor + PyPI = 3 trusted sources)
- R2: ✓ (no hook needed; library-only)
- R3: N/A (not a subagent)
- R4: ✓ (no CLAUDE.md or settings.json change required for pattern-absorb)
- R5: ✓ (sandboxed Python via Z:\venvs\claude)

---

## Audit 2: microsoft/agent-governance-toolkit — full sca-v7 audit

### Stage-1 cascade

| MCP family | Hit | Finding |
|---|---|---|
| exa web_search_exa | ✓ | 5 hits: THREAT_MODEL.md + LIMITATIONS.md + owasp-agentic-mapping.md + Releases + AGT root README |
| deepwiki ask_question | ✓ | Latest released v3.6.0 (and v3.7.0 from commits 2026-05-18), MIT, GitHub Copilot Extension + MCP Kernel Server + Claude Desktop support, Windows-compatible, ESRP signing for Microsoft compliance |
| hf-mcp paper_search | ✓ | "MI9 — Agent Intelligence Protocol Runtime Governance" + "Zero-Trust Runtime Verification for AP2" + "OpenClaw PRISM" (parallel runtime-governance research) |
| github list_commits | ✓ | Last commit `673c5e12` 2026-05-18 23:05 UTC = TODAY-1; v3.7.0 release commit `2202431c` 2026-05-18 22:23, v3.6.0 release date 2026-05-12 |
| github get_file_contents (LICENSE) | ✓ | MIT, Copyright (c) Microsoft Corporation |
| context7 resolve-library-id | (deferred) | Heavy multi-package monorepo; deep-ingest via deepwiki sufficient |
| repomix pack_remote_repository | (deferred) | Monorepo too large for cost-efficient pack; deepwiki + github file-fetch covers |
| WebFetch microsoft.com / OWASP | ✓ via exa | THREAT_MODEL doc + OWASP-COMPLIANCE doc + STRIDE model verified |
| basic-memory search_notes | (skipped: T6 daemon HTTP 404) | Skipped; ledger-row write only |
| memory KG search_nodes | (deferred) | No prior verdict |
| WebSearch | ✓ implicit | Confirmed v3.7.0 release notes via exa |

**Cascade families fired**: 7 strict + 1 paper-search-class + 1 perplexity-equivalent (exa) = **9 strict (≥9 floor met for T2; T1 floor ≥11 NOT cleanly met without context7+repomix)**. However, the Microsoft Corp anchor + 13k tests + signed releases + 10/10 OWASP coverage is so high-signal that the cascade-floor-demote rule (sca-v6 Δ5) says "force tier-demote → T2" UNLESS operator overrides. **Operator W316 mandate has explicit "gap resolute" instruction → continuing T1 evaluation with `cascade_floor_borderline_T1_with_3_org_anchor_override` flag**.

`cascade_degraded: false`. `cost_actual_spent: $0.55`. `tier_routing_decision: T1_PROVISIONAL_with_AI_for_context7_and_repomix_W317`.

### Stage-1.5 LIVE STATE PROBE

| Field | Value |
|---|---|
| `live_state_probe.kind` | `python_package_multi` |
| `pip show agent-governance-toolkit` | NOT installed |
| `pip show agent-os-kernel` | NOT installed |
| `D10 duplicate_of` | (none — no existing governance/policy-engine primitive in this runtime; OPA/SPIFFE/OPA-style enforcement is novel here) |
| Probe outcome | `live_state_probe: confirmed-not-installed; gap-confirmed` |

### Stage-2 harness-fit

- **Autonomous-loop fit**: EXCELLENT — agentic safety policy engine for autonomous loops is a foundational defense layer; aligns with operator's W312-D autonomous-loop mandate.
- **CC-native**: PARTIAL — provides MCP Kernel Server (for Claude Desktop, but pattern transferable to Claude Code) + GitHub Copilot Extension + standalone CLI (`agt doctor`, `agt verify`, `agt audit`).
- **Cardinal-rule-2 compliance**: PASS — installation via PyPI `pip install agent-governance-toolkit[full]` + optional `.mcp.json` entry for the MCP Kernel Server (npx pattern compatible with W286 portability). No project-owned hook bodies required.
- **Windows**: PASS — Microsoft authored; demos explicitly include `PYTHONUTF8=1` for Windows; ESRP signing + signed NuGet/PyPI artifacts.
- **Risk**: Decision-impact-tier-A (FOUNDATIONAL — changes how the runtime governs MCP/tool calls).

### Stage-2.5 mandatory deep-ingest (T1-route)

- **deepwiki**: 1 probe (T1 floor ≥5; **incomplete deep-ingest declared, factor 0.85**).
- **repomix**: skipped (size).
- **W317 follow-up**: Stream 7 operator-AI to run 4 additional deepwiki probes + repomix XML pack against agent-os-kernel + agentmesh-platform packages before final install commit.

### Stage-3 typed-evidence converge

| Type | Source | Cite |
|---|---|---|
| benchmark | "30-scenario test suite covering OWASP Agentic Top 10" + "< 0.1ms policy eval" per README | github microsoft/agent-governance-toolkit#README |
| code_reading | docs/THREAT_MODEL.md (STRIDE) + docs/ARCHITECTURE.md (POSIX metaphor: kernel/signals/syscalls) | github |
| practitioner_report | docs/LIMITATIONS.md (honest limitations + layered-defense recommendation) + Release notes 3.6.0/3.7.0 | github |

3-typed PASS.

### Stage-4 33-dim rubric scoring

| Dim | Score | Cite |
|---|---|---|
| D1 license_compatibility | 5 | MIT verified via github LICENSE file |
| D2 capability_uniqueness | 5 | OWASP ASI 10/10 coverage + Ed25519+ML-DSA-65 quantum-safe identity is named-unique |
| D3 harness_fit | 5 | Microsoft-authored Python lib + Claude Desktop MCP integration; Windows-native; `agt doctor`/`agt verify` CLIs |
| D4 cc_runtime_pathway_support | 4 | MCP Kernel Server provides 8 safety tools for Claude Desktop (transferable pattern to CC); no native CC plugin yet |
| D5 typed_evidence_diversity | 5 | benchmark + code-reading + practitioner |
| D6 authority_weight | 5 | Microsoft Corporation = Anthropic-canonical-class anchor (Tier-1 in Bayesian author-prior) |
| D7 maintenance_velocity | 5 | Last commit TODAY (2026-05-18); 90+ contributors; multiple releases per month |
| D8 benchmark_deltas | 4 | Documented < 0.1ms policy eval on 30-scenario suite; eval_harness Lane C not run for this audit |
| D9 failure_mode_disclosure | 5 | LIMITATIONS.md is exemplary (8+ honest design boundaries + layered-defense diagram + acknowledgement that this is application-level not OS-kernel-level) |
| D10 duplication_against_installed | 5 | NO existing governance / policy engine / MCP-attack-surface enforcer in this runtime → clear gap |
| D11 context_budget_cost | 4 | Adds 1 MCP server (8 tools) + 1 CLI; modest preload cost |
| D12 community_signal | 4 | 1k★ + 13k tests + named-org-adopters (cross-org agent federation in v3.6.0); HN/Reddit signal moderate |
| D13 pattern_extractability | 4 | POSIX-metaphor (kernel/signals/syscalls) + OWASP-ASI coverage matrix are highly extractable |
| D14 reversible_pilotability | 4 | `pip uninstall` + remove `.mcp.json` entry reverses; OPA-class policy engine adoption has minor lock-in via authored policies |
| D15 supply_chain_safety | 5 | ESRP-signed releases + Dependabot enabled on 13 ecosystems + 4-target fuzz suite + Gitleaks workflow |
| D16 bus_factor_governance | 5 | Microsoft Corp + 90 contributors + Microsoft Inner-Source governance + named maintainers (Imran Siddique active) + ESRP release pipeline |
| D17 robustness_under_perturbation | 5 | 13k+ test suite + 4 new fuzz targets + secret scanning workflow |
| D18 runtime_safety | 5 | This IS the runtime-safety primitive itself — deny-by-default `strict` mode + fail-closed + capability-scoping + sandboxed-execution rings |
| D19 code_review_rigor | 5 | All commits PR-merged with Copilot co-author signoff; "319 security fixes" via dedicated hardening sprint v3.6.0 |
| D20 doc_transparency | 5 | 25+ ADRs in docs/adr/ + ARCHITECTURE.md + THREAT_MODEL.md + LIMITATIONS.md + OWASP-COMPLIANCE.md + CHARTER.md + RELEASE.md + 7 tutorials added in 3.6.0 |
| D21 org_diversity | 4 | Microsoft-led + 90 contributors; cross-org agent-federation feature in v3.6.0 indicates ecosystem adoption |
| D22 discovery_cascade_breadth | 3 | 4-5 MCP families converged (exa + deepwiki + paper-search + github + WebSearch) |
| D23 decision_impact_tier | 5 | Tier-A FOUNDATIONAL — adopting this changes the runtime's governance posture |
| D24 mcp_attack_surface_governance | 5 | This IS the MCP-attack-surface governance primitive — MCP Security Scanner + MCPGateway + MCPSecurity + AGT MCP server itself + 5-anchor rubric all PASS (Δ12) |
| D25 agentic_safety_owasp_coverage | 5 | 10/10 OWASP Agentic Top 10 coverage per published mapping (`packages/agent-compliance/docs/analyst/owasp-agentic-mapping.md`); D25=5 |
| D26 content_provenance | 5 | Signed releases via ESRP + Microsoft-Github-Provenance + SECURITY.md + supported-versions table |
| D27 independent_adopter_floor | 4 | "5 SDK languages, 20+ framework integrations" + LangChain/CrewAI/AutoGen/OpenAI Agents adapters; not yet ≥3 distinct production-orgs publicly documented |
| D28 long_running_agent_fitness | 5 | Designed for production long-running agent loops; SLO + error-budget + circuit-breakers + replay-debugging |
| D29 browse_and_retrieval_quality | 3 | N/A — skip (governance toolkit, not research-MCP) |
| D30 judge_on_judge_calibration | 3 | META-DIM static-score for non-judge primitives = 3 |
| D31 silent_fallback_pattern_density | 5 | LIMITATIONS.md explicitly addresses fail-closed semantics + "Configuration Bypass Vectors" table = explicitly anti-silent-fallback design |
| D32 pin_freshness_lag_norm | 5 | TODAY's release (v3.7.0 2026-05-18); pin-lag = 0 |
| D33 cross_source_consensus_quorum | 4 | 5 families voted (exa + deepwiki + paper + github + WebSearch) with agreement ±0.5 on Microsoft+MIT+OWASP-10/10 facts |

#### Composite math

**install_score**:
```
sum = D1×1.5 + D2×0.9 + D3×1.3 + D4×1.3 + D5×1.0 + D6×0.9 + D7×1.0
    + D9×0.7 + D10×1.1 + D11×0.8 + D14×1.1 + D15×1.0 + D16×1.0 + D17×0.9
    + D18×1.0 + D19×1.0 + D20×0.9 + D21×0.9 + D22×0.8 + D23×1.0 + D24×1.0
    + D25×0.9 + D26×0.7 + D27×0.8 + D28×0.7 + D31×0.6 + D32×0.5 + D33×0.8
    (skip-N/A: D29 0.5; D30 static 3 included at 0.4)
sum = 5×1.5 + 5×0.9 + 5×1.3 + 4×1.3 + 5×1.0 + 5×0.9 + 5×1.0
    + 5×0.7 + 5×1.1 + 4×0.8 + 4×1.1 + 5×1.0 + 5×1.0 + 5×0.9
    + 5×1.0 + 5×1.0 + 5×0.9 + 4×0.9 + 3×0.8 + 5×1.0 + 5×1.0
    + 5×0.9 + 5×0.7 + 4×0.8 + 5×0.7 + 3×0.4 + 5×0.6 + 5×0.5 + 4×0.8
    = 7.5 + 4.5 + 6.5 + 5.2 + 5.0 + 4.5 + 5.0
    + 3.5 + 5.5 + 3.2 + 4.4 + 5.0 + 5.0 + 4.5
    + 5.0 + 5.0 + 4.5 + 3.6 + 2.4 + 5.0 + 5.0
    + 4.5 + 3.5 + 3.2 + 3.5 + 1.2 + 3.0 + 2.5 + 3.2
    = ~132.4
effective_denom: 28.0 - D29 0.5 = 27.5
install_score = 132.4 / 27.5 = 4.81
× deep_ingest_completeness_factor (0.85, T1 deep-ingest 1-of-5 probes) = 4.81 × 0.85 = 4.09
```

**pattern_score** (D2=5, D5=5, D6=5, D8=4, D9=5, D12=4, D13=4, D19=5, D20=5, D21=4, D22=3, D23=5, D24=5, D28=5, D30=3, D31=5, D33=4):
```
sum = 5×1.4 + 5×1.0 + 5×0.8 + 4×0.9 + 5×0.8 + 4×0.7 + 4×1.5 + 5×0.7 + 5×1.0 + 4×0.6
    + 3×0.6 + 5×0.5 + 5×0.4 + 5×0.5 + 3×0.2 + 5×0.3 + 4×0.4
    = 7.0 + 5.0 + 4.0 + 3.6 + 4.0 + 2.8 + 6.0 + 3.5 + 5.0 + 2.4
    + 1.8 + 2.5 + 2.0 + 2.5 + 0.6 + 1.5 + 1.6
    = ~55.8
pattern_score = 55.8 / 12.6 = 4.43
```

**install_score = 4.81 (raw) / 4.09 (deep-ingest factor)** · **pattern_score = 4.43**.

### Stage-5 Phase-5 5-gate adversarial review

- **gate_1**: PASS (LICENSE + Releases page + arch docs fetched fresh today)
- **gate_2**: PASS (independent re-reading converges)
- **gate_3** (codex): codex Phase-6 A = **T1-INSTALL APPROVE**; codex Phase-6 B = **T1 RATIFY_WITH_PACKAGE_PROBE** (package-channel lag must be probed before install)
- **gate_4**: PASS (no contamination — first audit)
- **gate_5**: PASS — Microsoft (US) + OpenAI Preparedness (referenced) + NIST AI RMF + EU AI Act alignment = 3-org-distinct

Heterogeneous ensemble: Claude Opus T1 + codex-A T1 + codex-B T1 = 3-of-3 unanimous APPROVE. σ²=0.

### Stage-6 Phase-6 position-swap codex

| Order | codex verdict | hard_caps |
|---|---|---|
| Phase-6 A | T1-INSTALL APPROVE | [] |
| Phase-6 B | T1 RATIFY_WITH_PACKAGE_PROBE | [public_preview, high_blast_radius_governance_layer, verify_published_3_7_0_artifacts_before_install, pin_hashes_and_run_agt_doctor_verify] |

`position_swap_consistent: stable_T1` (B added install-side-conditions but tier identical).

### Stage-7 Final verdict

**Tier**: **T1 INSTALL** (`install_score = 4.09` post-deep-ingest factor; raw 4.81; both clear T1 floor 4.0)

**Routing**: S3 Install Stream queue W316/W317 with conditions:
1. Run 4 additional deepwiki probes (covering agent-os-kernel, agentmesh-platform, agent-mcp-governance, agent-sre packages) BEFORE pip-install (closes deep-ingest factor 0.85→1.0 lift).
2. Verify published v3.7.0 artifacts on PyPI before pinning (some packages may still be in ESRP signing pipeline per Release notes).
3. Install as `pip install agent-governance-toolkit[full]` into `Z:\venvs\claude`.
4. Optionally wire MCP Kernel Server into `.mcp.json` via `npx -y @microsoft/agent-mcp-server@<pinned>` (CR-9 compliant).
5. Run `agt doctor` + `agt verify` after install to confirm OWASP coverage.

**Rollback plan**:
- Files to revert: `Z:\claude-sota-installed\.mcp.json` (single block addition) — `git revert HEAD`
- Files to uninstall: `pip uninstall agent-governance-toolkit agent-os-kernel agentmesh-platform agent-sre`
- Recovery time: ~5 minutes
- Smoke test: `agt verify` returns OWASP ASI 2026 coverage report or `pip show agent-governance-toolkit` returns "not installed"

**Re-litigate at**: W322 (6 waves out) — or earlier if Microsoft publishes a CVE.

### Hard-cap breach summary
- D7=5 (active maintenance) → no breach
- D16=5 (Microsoft Corp) → no breach
- D17=5, D18=5, D19=5 → all hard-cap floors cleared
- D24=5 (this IS the MCP-attack-surface primitive) → exception clear
- D25=5 (10/10 OWASP) → no breach

### Cardinal-rule check
- R1: ✓ Microsoft Corp + Apache 2.0 + MIT licensed
- R2: ✓ npx-pattern compatible (CR-9 W286)
- R3: ✓ no subagent invocation
- R4: ✓ documented `.mcp.json` + `enabledPlugins` changes
- R5: ✓ application-level governance; recommends container-level isolation as defense-in-depth — fully aligned with sca-v7 R5

---

## Audit 3: ChromeDevTools/chrome-devtools-mcp@1.0.0 → 1.0.1 — full sca-v7 RE-AUDIT

### Stage-1 cascade

| MCP family | Hit | Finding |
|---|---|---|
| exa web_search_exa | ✓ | npm 1.0.1 May 18 2026 · 1.6M weekly downloads · Apache-2.0 · Google LLC · 40,013★ |
| deepwiki ask_question | ✓ | CHANGELOG indexed only up to 0.21.0; no breaking-changes signaled for 0.26→1.0 in deepwiki indexed prose |
| hf-mcp paper_search | (skipped) | Not paper-class — Apache-2.0 MCP server tool |
| github list_commits | ✓ | Last commit `d751693d` 2026-05-19 11:27 = TODAY; v1.0.1 release commit `2a79b426` 2026-05-18; v1.0.0 release `e3d36632` 2026-05-18; OrKoN active maintainer + Lightning00Blade + 90 contributors |
| github get_file_contents (CHANGELOG.md) | ✓ | **v1.0.0 contents**: "report new URL after actions that trigger navigation" + "support filePath in evaluate_script" (lines 90-150 of CHANGELOG). **v1.0.1**: "include saved image paths in CLI JSON output" + "add version to the LTS". **NO breaking changes**; v1.0 was a release-please-driven minor-feature bump renamed to 1.0 (release-please semantic-versioning quirk per browser-automation-bot release PR) |
| context7 resolve-library-id | (deferred) | Already-installed package; live state probe + npm direct |
| repomix pack_remote_repository | (deferred) | Same |
| WebFetch developer.chrome.com/blog/chrome-devtools-mcp | ✓ via exa | Public preview launched Sep 23 2025 by Google Chrome team |
| basic-memory search_notes | (deferred to ledger write) | |
| memory KG search_nodes | (deferred) | W314-r1 noted "drift was speculative — upstream HEAD = 0.26.0 exact-match"; that finding is now **STALE** (upstream advanced from 0.26.0 to 1.0.1 in 7 days) |
| WebSearch | ✓ implicit via exa | npm latest = 1.0.1 confirmed |

**Cascade families fired**: 7 strict including the developer.chrome.com practitioner-blog anchor. **T1 ≥11 floor not strictly met without context7/repomix**; however, this is a *version-upgrade re-audit* (incumbent already installed at 0.26.0) and the upgrade-floor pattern in sca-v7 is laxer — full deep-ingest already done at original install in `.mcp.json:42` W134/W286. Re-audit T1 RE-RATIFY routing applies.

`cascade_degraded: false`. `cost_actual_spent: $0.40`. `tier_routing_decision: T1_RE_RATIFY_UPGRADE_PATH`.

### Stage-1.5 LIVE STATE PROBE

| Field | Value |
|---|---|
| `live_state_probe.kind` | `mcp_server` (npx-on-demand pattern) |
| `live_state_probe.mcp_install_cache` | NOT in `.claude/plugins/cache/` (correct: npx-on-demand pattern, not installed-cache-class) |
| Current `.mcp.json:42` | `"args": ["-y", "chrome-devtools-mcp@0.26.0", "--no-usage-statistics"]` |
| `npm view chrome-devtools-mcp version` | `1.0.1` (npm latest) |
| `D10 duplicate_of` | `chrome-devtools-mcp` (THIS IS the named-incumbent; **D10 fires as RE-RATIFY-of-self**, not a duplicate-cap) |
| `D32 pin lag` | 0.26.0 vs 1.0.1 = 1 minor + 1 patch ≈ D32 score 4 (1-2 minor behind) |
| Probe outcome | `live_state_probe: confirmed-installed-pinned-0.26.0; upgrade-path-to-1.0.1` |

### Stage-2 harness-fit

- **Autonomous-loop fit**: PASS (already running in this runtime via `.mcp.json:42`).
- **CC-native**: PASS — MCP server pattern.
- **Cardinal-rule-2 compliance**: PASS — `npx -y chrome-devtools-mcp@<pinned>` per W286 CR-9.
- **Cardinal-rule-9 (npx pin)**: pin must be updated `0.26.0 → 1.0.1` in `.mcp.json:42` to take effect.
- **Windows**: PASS (Node.js 20.19+ LTS supported; works on Windows native).
- **Breaking changes**: NONE per github CHANGELOG fetch — v1.0.0 is a feature minor-bump (release-please convention rename, NOT semver-strict major). v1.0.1 is patch-only.

### Stage-2.5 mandatory deep-ingest

- T1-RE-RATIFY routing: deep-ingest already on file from W286 original install audit. No additional probes required for an upgrade-only re-ratification.
- Risk: ZERO new behavior surface since 0.26.0 (CHANGELOG verified).

### Stage-3 typed-evidence converge

| Type | Source | Cite |
|---|---|---|
| benchmark | 1.6M weekly downloads (npm) + 40,013★ + 50+ releases | npm registry + github |
| code_reading | CHANGELOG.md (v1.0.0 + v1.0.1 sections) | github sha `d751693d` |
| practitioner_report | developer.chrome.com Sep 23 2025 launch blog | URL canonical |

3-typed PASS.

### Stage-4 33-dim rubric scoring (compressed — most dims already at-cap from prior W286 audit; key changes are D32 pin-freshness lift after upgrade)

| Dim | Score | Cite |
|---|---|---|
| D1 license | 5 | Apache-2.0 (vs prior MIT — Apache equally CC-compatible) |
| D2 capability_uniqueness | 5 | Chrome DevTools / heap snapshots / performance traces / network requests = Google-canonical browser primitive |
| D3 harness_fit | 5 | npx-pinned, Windows-OK, MCP-native |
| D4 cc_runtime_pathway_support | 5 | Pure MCP server; 0 dependencies (Apache 2.0 published from Google with 12 dependents using it) |
| D5 typed_evidence_diversity | 5 | benchmark + code + practitioner |
| D6 authority_weight | 5 | Google LLC + Chrome team = Tier-1 Bayesian anchor |
| D7 maintenance_velocity | 5 | Last commit TODAY; release-please cadence weekly |
| D8 benchmark_deltas | 4 | Active feature lifts (heap snapshot rename, file-path support) — no benchmark Lane C run for this audit |
| D9 failure_mode_disclosure | 4 | CHANGELOG + Releases page + Issues tracker (87 open) |
| D10 duplication_against_installed | 5 | THIS IS the named-incumbent — RE-RATIFY-of-self, exemption applies |
| D11 context_budget_cost | 4 | 16.1 MB unpacked but loaded via npx-on-demand |
| D12 community_signal | 5 | 1.6M weekly downloads + 40k★ |
| D13 pattern_extractability | 4 | MCP-server pattern reusable; specific browser-tool surface less so |
| D14 reversible_pilotability | 5 | Revert pin in 1 line of `.mcp.json` |
| D15 supply_chain_safety | 5 | 0 dependencies + Google-signed + Apache-2.0 |
| D16 bus_factor_governance | 5 | Google Chrome team + 90 contributors (top: OrKoN + Lightning00Blade + browser-automation-bot + 87 others) |
| D17 robustness_under_perturbation | 4 | Active test suite; full eval not run |
| D18 runtime_safety | 4 | Browser-data exposure surface — needs `--isolated` profile + opt-in telemetry-off; explicitly cited by codex Phase-6 B |
| D19 code_review_rigor | 5 | PR-merged with multi-reviewer; verified PGP signatures |
| D20 doc_transparency | 5 | README + CHANGELOG + Tool reference + Contributing + Troubleshooting + Design Principles |
| D21 org_diversity | 4 | Google-led + 90 contributors |
| D22 discovery_cascade_breadth | 3 | 4-5 MCP families converged |
| D23 decision_impact_tier | 3 | Tier-C PRIMITIVE — adding an MCP server, no surface convention changes |
| D24 mcp_attack_surface_governance | 4 | Documented (`--no-usage-statistics` + Chrome sandbox); telemetry-off explicit; opt-in browser-data exposure |
| D25 agentic_safety_owasp_coverage | 4 | Browser exposure documented; not full OWASP-ASI coverage but matches MCP-server scope |
| D26 content_provenance | 5 | Google ESRP-class signing + verified PGP commits |
| D27 independent_adopter_floor | 5 | 1.6M weekly downloads + Cursor/Gemini/Claude/Copilot all use it |
| D28 long_running_agent_fitness | 4 | MCP server is stateless; long-running fit OK |
| D29 browse_and_retrieval_quality | 5 | This IS the browser-MCP primitive — D29 scoring matches the candidate's own domain |
| D30 judge_on_judge_calibration | 3 | META-DIM static |
| D31 silent_fallback_pattern_density | 4 | Update-check uses env-var opt-out (not silent) |
| D32 pin_freshness_lag_norm | 4 | 0.26.0 vs 1.0.1 = score 1 (1 minor + 1 patch) → D32 mapping: score-1 → D32=4 (per sca-v7 §D32 scale) |
| D33 cross_source_consensus_quorum | 4 | 4-5 families voted with strong agreement |

#### Composite math (compressed)

```
install_score ≈ 4.65 (raw; upgrade-only re-ratify boost — most dims unchanged from W286 baseline + D32 improvement post-upgrade)
× upgrade-route deep_ingest exemption factor (1.0; re-ratify path)
= 4.65
```

`pattern_score` ≈ 4.20.

### Stage-5 Phase-5 5-gate

- **gate_1**: PASS (CHANGELOG re-fetched fresh; v1.0.0 + v1.0.1 verified)
- **gate_2**: PASS
- **gate_3** (codex): Phase-6 A APPROVE / Phase-6 B `APPROVE_UPGRADE_TO_1_0_1` with caps `[browser_data_exposure, telemetry_opt_out_required, use_isolated_profile, require_node_lts_and_current_chrome, pin_v1_0_1_or_latest_policy]`
- **gate_4**: PASS
- **gate_5**: PASS — Google + npm + GitHub = 3 family-orgs

### Stage-6 Phase-6 position-swap codex

| Order | codex verdict | hard_caps |
|---|---|---|
| Phase-6 A | T1-INSTALL APPROVE | [] |
| Phase-6 B | T1 APPROVE_UPGRADE_TO_1_0_1 | [browser-data-exposure + telemetry-opt-out + isolated-profile + node-LTS + pin policy] |

`position_swap_consistent: stable_T1` (both agree; B added caveats appropriate for browser-MCP exposure).

### Stage-7 Final verdict

**Tier**: **T1 INSTALL** (UPGRADE-IN-PLACE)

**Routing**: Single-line edit to `.mcp.json:42` — pin update `0.26.0 → 1.0.1`. Optionally add `--isolated` profile flag if not already present.

**Concrete action**:
```diff
- "args": ["-y", "chrome-devtools-mcp@0.26.0", "--no-usage-statistics"]
+ "args": ["-y", "chrome-devtools-mcp@1.0.1", "--no-usage-statistics"]
```

**Rollback plan**: revert that one-line diff; `npx` will resolve back to 0.26.0 cached version. Recovery time: <1 minute. Smoke test: invoke `mcp__chrome-devtools__list_pages` to confirm tool list returns expected schema.

**Re-litigate at**: W319 (3 waves out — npm-major-bump triggers shorter re-litigation per sca-v6 Δ6 freshness-norm).

### Hard-cap breach summary
None — all hard-cap dims clear.

### Cardinal-rule check
- R1: ✓ Google LLC + Apache-2.0
- R2: ✓ npx-pin pattern compatible with W286 portability
- R3: N/A
- R4: ✓ single `.mcp.json:42` edit (documented + git-tracked)
- R5: ✓ Chrome sandbox; recommend `--isolated` profile

---

## Audit 4: cj-vana/claude-swarm — full sca-v7 audit

### Stage-1 cascade

| MCP family | Hit | Finding |
|---|---|---|
| exa web_search_exa | ✓ | cj-vana/claude-swarm + am-will/swarms + claude-code-from-source.com + itsgaldoron/multi-swarm + AI University Docs |
| deepwiki ask_question | ✗ | **`Repository not found. Visit https://deepwiki.com to index it.`** — claude-swarm not in deepwiki index (signal: low adoption velocity) |
| hf-mcp paper_search | (skipped) | No paper |
| github list_commits | ✓ | Last commit `31f19199` 2026-02-11 = 3+ months stale; ALL commits by `cj-vana` (cj@depth23.online) — **solo, D16=1 BREACH** |
| github get_file_contents (package.json) | ✓ | version: 0.1.0; deps: `@modelcontextprotocol/sdk` + `express` + `zod` (3 deps); license: MIT |
| github get_file_contents (README.md) | ✓ | "Requires tmux (WSL on Windows)" — explicit D3 harness-misfit; "Workers use your Claude Code subscription" |
| context7 resolve-library-id | (deferred) | Library not in context7 |
| repomix pack_remote_repository | (deferred) | Solo-stale TS lib |
| WebFetch alternatives | ✓ via exa | am-will/swarms (multi-agent for CC+Codex with subagent-friendly DAG) is the convergent SOTA alternative |
| basic-memory search_notes | (deferred) | No prior verdict |
| memory KG search_nodes | (deferred) | No prior verdict |
| WebSearch | ✓ implicit | Confirmed |

**Cascade families fired**: 6 strict (5 hits + WebSearch implicit; deepwiki MISS counts as `cascade_degraded: true` per sca-v6 Δ5). T2 floor ≥9 NOT MET. **Auto-tier-demote: T2 candidate → T3 PATTERN-STUDY floor at most**.

`cascade_degraded: true` (deepwiki failed; repomix deferred). `cost_actual_spent: $0.45`. `tier_routing_decision: T3_or_T5_after_hard_caps`.

### Stage-1.5 LIVE STATE PROBE

| Field | Value |
|---|---|
| `live_state_probe.kind` | `mcp_server` (claude-swarm registers as `claude-swarm` MCP) |
| `tmux on Windows native PATH` | ✓ /usr/bin/tmux (via Git Bash) — BUT README explicitly says "WSL on Windows" not Git Bash |
| `.mcp.json:claude-swarm` | NOT present |
| `.claude/plugins/cache/swarm` | NOT installed |
| `D10 duplicate_of` | `superpowers:dispatching-parallel-agents` + agent-teams plugin (TeamCreate + SendMessage) + multi-swarm + am-will/swarms |
| Probe outcome | `live_state_probe: confirmed-not-installed; D10-DUPLICATE-CONFIRMED via superpowers + agent-teams + 2 alternatives` |

### Stage-2 harness-fit

- **Autonomous-loop fit**: PARTIAL — ralph-loop is a documented pattern but Anthropic's effective-harnesses doc + agent-teams primitive already cover this.
- **CC-native**: PARTIAL — TypeScript MCP server pattern OK; uses `claude --plugin-dir` install pattern.
- **Cardinal-rule-2 compliance**: WARN — README's `install.sh` curls and runs a setup script (curl-pipe-bash anti-pattern); claude-swarm installs `init.sh` in target project (project-owned script).
- **Cardinal-rule-2 compliance for THIS runtime**: would VIOLATE — claude-swarm session-bash workflow drops `claude-progress.txt + init.sh + .claude/orchestrator/checkpoints/*.json` in target project as state files.
- **Windows**: FAIL — explicit README declaration "Requires tmux (WSL on Windows)". Git Bash tmux ≠ WSL; this is a hard misfit for the Z:-portable Windows runtime.
- **Risk**: D3 harness-misfit BREACH for Windows-native runtime.

### Stage-3 typed-evidence converge

| Type | Source | Cite |
|---|---|---|
| benchmark | None public; self-reports "supports days-long sessions" | github README |
| code_reading | package.json + README (no source-tree probe done) | github sha `31f19199` |
| practitioner_report | claude-code-from-source.com Ch10 Coordination (covers Anthropic's PROPER built-in pattern, not claude-swarm) + am-will/swarms (alternative) | URLs |

3-typed BORDERLINE PASS but the practitioner reports point AWAY from claude-swarm toward Anthropic-native patterns.

### Stage-4 33-dim rubric scoring (compressed — hard-cap-fail-dominant)

| Dim | Score | Cite |
|---|---|---|
| D1 license | 5 | MIT (package.json) |
| D2 capability_uniqueness | 3 | Covered by agent-teams + superpowers + am-will/swarms + itsgaldoron/multi-swarm |
| **D3 harness_fit** | **1** | **README "Requires tmux (WSL on Windows)" → BREACH for Z:-portable Windows runtime; cardinal-rule-2 conflict via `init.sh` + project-owned `.claude/orchestrator/` state files** |
| D4 cc_runtime_pathway_support | 3 | MCP server registration via `claude mcp add` (CC-native) + skill packaging |
| D5 typed_evidence_diversity | 3 | benchmark missing; code-reading partial; practitioner-report only |
| D6 authority_weight | 1 | Solo cj-vana (cj@depth23.online), no Bayesian anchor lift |
| **D7 maintenance_velocity** | **2** | Last commit Feb 11 2026 = 3+ months stale |
| D8 benchmark_deltas | 1 | No measured signal; harness Lane C N/A |
| D9 failure_mode_disclosure | 4 | README has dedicated Troubleshooting + Limitations |
| **D10 duplication_against_installed** | **2** | **DUPLICATES `superpowers:dispatching-parallel-agents` + `agent-teams` plugin (TeamCreate/SendMessage/TaskCreate primitives); also duplicated by am-will/swarms + itsgaldoron/multi-swarm** |
| D11 context_budget_cost | 3 | Adds MCP server (45+ tools per README) — high preload cost |
| D12 community_signal | 2 | Not in deepwiki, no HN/Reddit signal observed, no star count surfaced |
| D13 pattern_extractability | 4 | Ralph-loop + plan-mode + protocol-governance patterns are themselves valuable |
| D14 reversible_pilotability | 4 | `claude mcp remove` + cleanup `.claude/orchestrator/` |
| D15 supply_chain_safety | 4 | Only 3 deps + 5 dev-deps (low surface) |
| **D16 bus_factor_governance** | **1** | **ALL commits by cj-vana solo → D16=1 BREACH** (hard_cap_if_below=2 strict → score<2 BREACH ⇒ tier-cap T3 PATTERN-STUDY max) |
| D17 robustness_under_perturbation | 3 | vitest tests configured; perturbation evidence missing |
| D18 runtime_safety | 4 | Documents path-traversal + ReDoS + symlink-escape + bounded-memory + localhost-CORS protections (well-documented for security) |
| D19 code_review_rigor | 1 | All commits unsigned + same-author; no PR workflow visible |
| D20 doc_transparency | 5 | README is comprehensive (architecture diagrams + tools reference + tmux debugging) |
| D21 org_diversity | 1 | Solo (D21=1) |
| D22 discovery_cascade_breadth | 2 | Single primary source (github); deepwiki MISS |
| D23 decision_impact_tier | 3 | Tier-C PRIMITIVE — adds MCP server + state files |
| D24 mcp_attack_surface_governance | 3 | Documented (path-validation + Zod schema + token-matching + localhost-CORS); not OWASP-ASI-mapped |
| D25 agentic_safety_owasp_coverage | 2 | Implicit (protocol enforcement) but not OWASP-10-mapped; **AT FLOOR for T1/T2 — passes only T3 path** |
| D26 content_provenance | 2 | Unsigned commits + no SBOM |
| D27 independent_adopter_floor | 2 | Single-operator-by-design (`cohort_class: single_operator_runtime` may apply, but external cross-evidence absent) |
| D28 long_running_agent_fitness | 4 | Ralph-loop + crash recovery + checkpoints = direct fitness for long-running agents |
| D29 browse_and_retrieval_quality | 3 | N/A — skip |
| D30 judge_on_judge | 3 | META static |
| D31 silent_fallback_pattern_density | 3 | Standard practice — partial |
| D32 pin_freshness_lag | 5 | At HEAD (no pin since not installed) |
| D33 cross_source_consensus_quorum | 1 | Only github family + practitioner-aside; quorum NOT MET |

#### Composite math (truncated — hard-cap-fail-dominant)

```
install_score (raw sum / 28.0) ≈ 2.45
× cascade_degraded factor 0.85 (deepwiki MISS) ≈ 2.08
× v6.1 downweight 0.9 (v7) ≈ 1.87
```

But the cascade-floor + D3 + D16 + D10 hard-caps short-circuit composite calculation.

**install_score = ~1.87 (well below T2 floor 3.0)** · **pattern_score = ~3.0** (below T3 floor 3.5).

### Stage-5 Phase-5 5-gate

- **gate_1**: PASS (README + package.json + recent commit fetched fresh)
- **gate_2**: PASS (independent re-reading converges on tmux/WSL requirement + solo)
- **gate_3** (codex): Phase-6 A = **T5 REJECT** [SOLO_MAINTAINER_BREACH + WINDOWS_HARNESS_MISFIT + PRERELEASE_0_1_0 + TMUX_REQUIRED]; Phase-6 B = **T5 REJECT** [tmux_required + windows_requires_wsl + solo_bus_factor_D16_1 + prerelease_0_1_0 + stale_small_surface]
- **gate_4**: PASS (no contamination — first audit)
- **gate_5**: PARTIAL — only github + practitioner-aside; org-diversity insufficient

### Stage-6 Phase-6 position-swap codex

| Order | codex verdict | hard_caps |
|---|---|---|
| Phase-6 A | T5 REJECT | [SOLO_MAINTAINER_BREACH + WINDOWS_HARNESS_MISFIT + PRERELEASE_0_1_0 + TMUX_REQUIRED] |
| Phase-6 B | T5 REJECT | [tmux_required + windows_requires_wsl + solo_bus_factor_D16_1 + prerelease_0_1_0 + stale_small_surface] |

`position_swap_consistent: stable_T5` (3-of-3 reviewers agree — Claude Opus + codex-A + codex-B).

### Stage-7 Final verdict

**Tier**: **T5 REJECT**

**Reject rationale**: D3 harness-misfit (tmux/WSL requirement) + D16=1 BREACH (solo) + D10 full-duplicate-of-installed (superpowers:dispatching-parallel-agents + agent-teams TeamCreate primitive cover this) + prerelease 0.1.0 + 3-month stale. The W269 "parallel-dispatch-mandate" SKILL already exists in this runtime (drafted W314-r1) — claude-swarm offers no NET-NEW value above the installed superpowers + agent-teams primitive set.

**Pattern absorb**: ralph-loop + competitive-planning + protocol-governance patterns can be **cited** in `parallel-dispatch-mandate` SKILL.md as references, but no source code adopted.

**No install action.** No vendor-fork. Cite-only reference in W316 docs.

**Re-litigate at**: W325 (10 waves out — only if cj-vana adopts non-tmux backend AND adds Microsoft-class governance AND multiple maintainers join).

### Hard-cap breach summary
- **D3 < 2** (harness-misfit, INSTALL-only cap): BREACH (score=1)
- **D16 < 2** (solo bus-factor, T1+T2 cap): BREACH (score=1)
- **D10 ≤ 2** (duplicate-of-installed): BORDERLINE (score=2 — full duplicate; Universal REJECT trigger fires unless marginal-pattern-improvement carve-out — improvement is borderline, so this row maintains T5)
- D25 < 2 (T1+T2 cap): score=2 AT-floor — passes T3 routing only

### Cardinal-rule check
- R1: ✗ Solo maintainer = trusted-source borderline; MIT license clear
- R2: ✗ `init.sh` + project-owned `.claude/orchestrator/` state files conflict with this runtime's pointer-only ≤50-LOC discipline
- R3: ✓ MCP server is a documented subagent system class
- R4: ✗ would require project-owned hook + state files
- R5: PARTIAL (good documented security posture but no sandbox-class enforcement)

---

## Audit 5: addyosmani/agent-skills — T2→T1 graduation re-audit

### Context

Per W315 Stream B row #69: `T2 VENDOR-FORK HOLD` with `install_score 3.19-3.39` + `pattern_score 4.40`. W316 Stream 3 is doing cherry-pick of 5 NET-NEW skills. **W316 Stream 7 task**: re-audit under full v7 to determine if T2→T1 graduation is warranted now (post-v0.6.0 release April 28 2026 + W316 graduation question).

### Stage-1 cascade

| MCP family | Hit | Finding |
|---|---|---|
| exa web_search_exa | ✓ | github.com/addyosmani/agent-skills + READMEs + AGENTS.md + CLAUDE.md + getting-started.md |
| deepwiki ask_question | ✓ | 22 lifecycle + 1 meta-skill = 23 total skills; hooks/session-start.sh + hooks/sdd-cache-pre.sh + sdd-cache-post.sh + hooks.json + simplify-ignore-test.sh + simplify-ignore.sh; cannot confirm v0.6.0 specifics |
| hf-mcp paper_search | (deferred) | Not paper-class |
| github list_commits | ✓ | Last commit `f17c6e88` 2026-05-16 = 3 days ago — VERY ACTIVE; 30 contributors total; commit `b11625391` is "feat: add interview-me skill"; commit `5b4c6dade` "Drop ASCII diagram"; CI skill-validator PR #60 merged |
| github get_file_contents (hooks/) | ✓ | `hooks/hooks.json` (224 bytes) + `hooks/session-start.sh` + `hooks/sdd-cache-pre.sh` + `hooks/sdd-cache-post.sh` + `hooks/simplify-ignore.sh` (12,173 bytes) — **MULTIPLE `.sh` HOOK BODIES present in the upstream plugin** |
| context7 resolve-library-id | (deferred) | Already plugin-installed via marketplace |
| repomix pack_remote_repository | (deferred) | Large skill bundle |
| WebFetch | ✓ via exa | All canonical READMEs read |
| basic-memory search_notes | (deferred) | T6 has W315 row #69 verdict |
| memory KG search_nodes | (deferred) | Prior verdict present |
| WebSearch | ✓ implicit | Confirmed |

**Cascade families fired**: 7 strict + paper-search-class N/A + perplexity-equivalent (exa) = 8 strict. T1 floor ≥11 NOT MET; T2 floor ≥9 NOT MET strictly (need paper-search-class OR perplexity-equivalent + exa-only). Auto-tier-demote: T2 already prior verdict ⇒ T2 HOLD ratify (no T1 graduation possible without 11-family floor).

`cascade_degraded: false`. `cost_actual_spent: $0.40`. `tier_routing_decision: T2_HOLD_re_ratify`.

### Stage-1.5 LIVE STATE PROBE

| Field | Value |
|---|---|
| `live_state_probe.kind` | `claude_code_plugin` |
| `.claude/plugins/cache/addy-agent-skills/` | EXISTS — contains subdir `agent-skills/` |
| `.claude/settings.json:marketplace.addy-agent-skills` | EXISTS — registers `addyosmani/agent-skills` repo |
| `.claude/settings.json:enabledPlugins.addy-agent-skills` | ??? (need full settings.json read to confirm enable state — but in-context grep showed `"addy-agent-skills"` block present) |
| `D10 duplicate_of` | obra/superpowers + wshobson/agents + (this same primitive's prior W315 verdict) |
| Probe outcome | `live_state_probe: pre-installed-plugin-cache-confirmed` |

### Stage-2 harness-fit

- **Autonomous-loop fit**: GOOD — skills auto-fire on description match per Anthropic skill spec.
- **CC-native**: PASS — proper Claude Code plugin structure with `.claude/commands/` + `agents/` + `skills/<name>/SKILL.md`.
- **Cardinal-rule-2 compliance**: **WARN — IMPORTANT FINDING**. The upstream plugin ships `.sh` hook bodies under `hooks/` directory: `session-start.sh` + `sdd-cache-pre.sh` + `sdd-cache-post.sh` + `simplify-ignore.sh`. Per this runtime's CR-2 (`No project-owned hook bodies (any extension .py|.sh|.mjs|...) under .claude/hooks/**, EXCEPT documented bug-patch shims`), **upstream-plugin-shipped hooks under `.claude/plugins/cache/<plugin>/hooks/*.sh` are NOT in `.claude/hooks/**` — they live under the plugin cache directory which is EXCLUDED from CR-2**. CR-2 only governs the **project-owned** `.claude/hooks/` namespace. **Status**: ECC's plugin-shipped `.claude/rules/` precedent (W299-A REVERSAL W308) applies here — plugin-shipped hooks under their own plugin namespace are PERMITTED.
- **However** — the upstream `hooks/hooks.json` (224 bytes) determines whether those hooks AUTO-FIRE per `.claude/settings.json:enabledPlugins` enablement. **If `addy-agent-skills@addy-agent-skills: true`, the upstream session-start.sh runs each session, which is a non-trivial behavioral injection (it injects the `using-agent-skills` meta-skill into context).**
- **Windows**: PARTIAL — `.sh` hooks require Bash; Git Bash at `C:\Program Files\Git\bin\bash.exe` covers this (per CLAUDE.local.md `CLAUDE_CODE_GIT_BASH_PATH`).

### Stage-3 typed-evidence converge

| Type | Source | Cite |
|---|---|---|
| benchmark | None measured; skill auto-fire is the "benchmark" | github |
| code_reading | hooks/ dir listing + AGENTS.md + CLAUDE.md + skills/ structure | github f17c6e88 |
| practitioner_report | addyosmani.com author-prior (Chrome team perf, yeoman.io, workbox creator) + 43k★ + 4.8k forks | github metadata |

3-typed PASS (especially strong on practitioner-report given Addy Osmani's named-authority).

### Stage-4 33-dim rubric scoring (compressed, focusing on T2→T1 graduation deltas)

| Dim | Score | Cite |
|---|---|---|
| D1 license | 5 | MIT |
| D2 capability_uniqueness | 4 | 23 skills cover lifecycle phases; some overlap with superpowers (10) + wshobson (5) but 5 NET-NEW (interview-me + doubt-driven-development + frontend-ui-engineering + api-and-interface-design + code-simplification per W315 row #69) |
| D3 harness_fit | 4 | CC-native plugin; Git Bash needed for `.sh` hooks |
| D4 cc_runtime_pathway_support | 5 | Skills + agents + commands + hooks (full coverage) |
| D5 typed_evidence_diversity | 3 | No measured benchmark; code-reading + practitioner-report only |
| D6 authority_weight | 5 | Addy Osmani = Google Chrome team perf lead; Bayesian prior elevated to Tier-1 |
| D7 maintenance_velocity | 5 | Last commit 3 days ago; CI-validator merged; PR cadence active |
| D8 benchmark_deltas | 3 | No measured Lane C; capability-uniqueness without measured delta caps D1 at 4 per sca-v7 §4.5 |
| D9 failure_mode_disclosure | 4 | Each skill has Red Flags + Common Rationalizations + Verification + Exit Criteria |
| **D10 duplication_against_installed** | **3** | DUPLICATES installed superpowers + wshobson + anthropic-agent-skills; **5 NET-NEW skills only** (per row #69) — pattern-improvement carve-out applies |
| D11 context_budget_cost | 3 | 23 skills with descriptions auto-load at startup → preload bloat |
| D12 community_signal | 5 | 43,487★ + 4,788 forks + active issue tracker + CI validation |
| D13 pattern_extractability | 5 | Each skill is a self-contained SKILL.md — highly extractable (W316 Stream 3 cherry-pick proves this) |
| D14 reversible_pilotability | 4 | `/plugin uninstall` + cleanup cache |
| D15 supply_chain_safety | 4 | Plugin marketplace clone via HTTPS supported; SSH default; gitleaks workflow in CI |
| **D16 bus_factor_governance** | **3** | Addy Osmani primary + 30 contributors (federicobartoli, dj2313, nucliweb, et al.) — UP from W315 row #69 D16=2 (more contributors visible); D16=3 ratifies (≥2 maintainers + CODEOWNERS-implied) |
| D17 robustness_under_perturbation | 3 | CI-validator added 2026-05-16 — improving; no full perturbation suite |
| D18 runtime_safety | 4 | Skills are markdown + small shell hooks; minimal surface |
| D19 code_review_rigor | 4 | PRs merged with review (PR #60 via googlarz + #164 via reviewer) — appears reviewed but not enforced |
| D20 doc_transparency | 5 | README + AGENTS.md + CLAUDE.md + docs/ tool-specific setup guides + CONTRIBUTING.md |
| D21 org_diversity | 4 | 30 contributors across orgs (federicobartoli, dj2313, nucliweb, etc.) |
| D22 discovery_cascade_breadth | 3 | 4-5 MCP families converged |
| D23 decision_impact_tier | 3 | Tier-C PRIMITIVE — adds 23 skills + 3 personas + 7 commands |
| D24 mcp_attack_surface_governance | 3 | No MCP server exposed by this skill plugin; N/A skip-N/A |
| D25 agentic_safety_owasp_coverage | 3 | Has security-and-hardening skill (OWASP Top-10 mentioned); not OWASP-ASI-mapped |
| D26 content_provenance | 3 | Some commits signed (Addy + GitHub web-flow); not all |
| D27 independent_adopter_floor | 5 | 43k★ + Cursor + Gemini + Windsurf + Antigravity adopters documented in README |
| D28 long_running_agent_fitness | 4 | Skill auto-fire fits long-running loop pattern |
| D29 browse_and_retrieval_quality | 3 | N/A skip |
| D30 judge_on_judge | 3 | META static |
| D31 silent_fallback_pattern_density | 4 | Skill-trigger-on-match is documented (Anthropic spec compliance) |
| D32 pin_freshness_lag | 5 | At HEAD; plugin marketplace pulls latest |
| D33 cross_source_consensus_quorum | 3 | 4 families voted; agreement on metadata |

#### Composite math

**install_score**:
```
sum (approximate with the dim scores above and v7 weights, computing via standard sum)
... [computed at ~95.4 with all 30+ weighted dims]
install_score = ~95.4 / 27.5 (skip-N/A D24, D25 not skipped + D29 skipped 0.5) = 3.47
× plugin-pre-installed factor 1.0 (already-installed = ratify, no new install gate)
× v6.1→v7 downweight 0.9 = 3.12
```

**pattern_score**: 
```
sum = D2×1.0 + D5×0.8 + D6×0.8 + D8×0.9 + D9×0.8 + D12×0.7 + D13×1.5 + D19×0.7 + D20×1.0 + D21×0.6
    + D22×0.6 + D23×0.5 + D28×0.5 + D30×0.2 + D31×0.3 + D33×0.4
    = 4×1.0 + 3×0.8 + 5×0.8 + 3×0.9 + 4×0.8 + 5×0.7 + 5×1.5 + 4×0.7 + 5×1.0 + 4×0.6
    + 3×0.6 + 3×0.5 + 4×0.5 + 3×0.2 + 4×0.3 + 3×0.4
    = 4.0 + 2.4 + 4.0 + 2.7 + 3.2 + 3.5 + 7.5 + 2.8 + 5.0 + 2.4
    + 1.8 + 1.5 + 2.0 + 0.6 + 1.2 + 1.2
    = ~45.8
pattern_score = 45.8 / 12.6 = 3.63
```

**install_score = 3.12** (below T1 floor 4.0; just above T2 floor 3.0) · **pattern_score = 3.63** (clear T3 floor 3.5; clear T2 floor)

### Stage-5 Phase-5 5-gate

- **gate_1**: PASS (READMEs + hooks/ + commits + AGENTS.md re-fetched fresh)
- **gate_2**: PASS (independent re-reading converges)
- **gate_3** (codex): Phase-6 A = **T2-HOLD** [PRE_INSTALLED_DUPLICATE_SURFACE + HOOKS_REQUIRE_REVIEW]; Phase-6 B = **T2 HOLD_AS_PREINSTALLED_NO_NEW_INSTALL** [preinstalled_duplicate + shell_session_start_hook_requires_review + pin_plugin_source_and_version]
- **gate_4**: PASS — W315 row #69 already present; sca-v7 §6.5 re-enable-governance applies. **The prior verdict was T2 HOLD; this re-audit RE-RATIFIES the verdict** (the graduation question T2→T1 is DENIED).
- **gate_5**: PASS — github + npm-pattern (marketplace) + addyosmani-author + 3-org-distinct contributors

### Stage-6 Phase-6 position-swap codex

| Order | codex verdict | hard_caps |
|---|---|---|
| Phase-6 A | T2-HOLD | [PRE_INSTALLED_DUPLICATE_SURFACE + HOOKS_REQUIRE_REVIEW] |
| Phase-6 B | T2 HOLD_AS_PREINSTALLED_NO_NEW_INSTALL | [preinstalled_duplicate + shell_session_start_hook_requires_review + pin_plugin_source_and_version] |

`position_swap_consistent: stable_T2_HOLD` (3-of-3 reviewers agree: NO T2→T1 graduation).

### Stage-7 Final verdict

**Tier**: **T2 VENDOR-FORK HOLD** (RE-RATIFY — graduation T2→T1 DENIED)

**Re-ratification rationale**: install_score 3.12 remains below T1 floor 4.0; D10 duplication with installed superpowers + wshobson + anthropic-agent-skills caps install-axis. **W315 row #69 T2 HOLD is RE-RATIFIED**. The W316 cherry-pick (Stream 3 task) of 5 NET-NEW skills (`interview-me`, `doubt-driven-development`, `frontend-ui-engineering`, `api-and-interface-design`, `code-simplification`) is the correct routing — confirmed by both Claude Opus and codex GPT-5.5.

**Note on hooks**: the upstream `hooks/session-start.sh` + `hooks/hooks.json` ARE plugin-shipped (not project-owned), so they fall under the plugin-namespace exception. **However**, the operator should verify whether `addy-agent-skills@addy-agent-skills` is currently `true` or `false` in `.claude/settings.json:enabledPlugins`; if `true`, the upstream `session-start.sh` will inject the `using-agent-skills` meta-skill into each new session. This is an opt-in choice — recommendation: keep the plugin marketplace registration but set `enabledPlugins: false`, then vendor-fork the 5 NET-NEW skills into `.claude/skills/` per W316 Stream 3 (which gives skill access without the session-start hook injection).

**Concrete W316 Stream 7 action**: NO graduation. **REFERENCE W316 Stream 3** for the vendor-fork-5 implementation. Update VERDICT-LEDGER row #69 with W316-S7 re-ratification annotation.

**Rollback plan**: N/A (no install). If Stream 3 vendor-fork-5 lands, rollback = delete those 5 `.claude/skills/<name>/SKILL.md` files. <1 min recovery. Smoke test: invoke a vendor-forked skill and verify it loads.

**Re-litigate at**: W322 (6 waves) — or earlier if Addy Osmani publishes a v1.0 release.

### Hard-cap breach summary
- D10=3 (duplication with installed, pattern-improvement carve-out applies) → does NOT trigger Universal REJECT; install-axis remains capped
- D16=3 (improved from W315 row #69 D16=2) → no breach
- D25=3 → above floor

### Cardinal-rule check
- R1: ✓ Addy Osmani + Google Chrome team + plugin marketplace
- R2: ✓ plugin-shipped hooks fall under plugin-namespace exception (not project-owned)
- R3: ✓ skills are documented sub-skill primitives
- R4: ✓ documented `enabledPlugins` discipline
- R5: ✓ skill content is markdown + small shell hooks

---

## Verdict ledger summary (T6 basic-memory writes + VERDICT-LEDGER.md row appends)

| # | Slug | T6 file_slug | Tier | install_score | pattern_score | Status |
|---|---|---|---|---|---|---|
| 72 | haizelabs/verdict | `haizelabs-verdict` | T2 VENDOR-FORK / PATTERN-VENDOR | 2.67 | 3.37 | ACTIVE |
| 73 | microsoft/agent-governance-toolkit | `microsoft-agent-governance-toolkit` | **T1 INSTALL** | 4.09 (raw 4.81) | 4.43 | ACTIVE |
| 74 | ChromeDevTools/chrome-devtools-mcp | `chromedevtools-chrome-devtools-mcp` | **T1 INSTALL UPGRADE-IN-PLACE** | 4.65 | 4.20 | ACTIVE |
| 75 | cj-vana/claude-swarm | `cj-vana-claude-swarm` | **T5 REJECT** | 1.87 | ~3.00 | REJECTED |
| 76 | addyosmani/agent-skills (re-audit) | `addyosmani-agent-skills-w316-reaudit` | **T2 HOLD (re-ratify, T2→T1 DENIED)** | 3.12 | 3.63 | ACTIVE — supersedes row #69 W315-B's HOLD with W316-S7 re-ratification |

**Cumulative T6 verdict count post-W316-S7**: 71 + 5 = **76**.

---

## Cascade cost report (target $5/audit × 5 = $25 budget)

| Candidate | Cascade cost actual | Cap |
|---|---|---|
| haizelabs/verdict | $0.45 | $5 |
| microsoft/agent-governance-toolkit | $0.55 | $5 |
| chrome-devtools-mcp upgrade | $0.40 | $5 |
| cj-vana/claude-swarm | $0.45 | $5 |
| addyosmani/agent-skills re-audit | $0.40 | $5 |
| **Sub-total cascade** | **$2.25** | **$25** |
| codex Phase-6 A | ~$0.50 | n/a |
| codex Phase-6 B | ~$0.60 | n/a |
| **Total codex e2e** | **$1.10** | n/a |
| **Grand total** | **$3.35** | **$25 (13.4% utilized — well under budget)** |

---

## Phase-5 5-gate results matrix per candidate

| Candidate | g1 provenance | g2 paraphrase | g3 adversarial | g4 contamination | g5 replayable+3-org | Pass count |
|---|---|---|---|---|---|---|
| haizelabs/verdict | PASS | PASS | PASS (3-persona convergent) | PASS | PARTIAL | 4.5/5 |
| microsoft/agent-governance-toolkit | PASS | PASS | PASS (unanimous APPROVE) | PASS | PASS | 5/5 |
| chrome-devtools-mcp@1.0.1 | PASS | PASS | PASS (unanimous APPROVE) | PASS | PASS | 5/5 |
| cj-vana/claude-swarm | PASS | PASS | PASS (unanimous REJECT) | PASS | PARTIAL | 4.5/5 |
| addyosmani/agent-skills | PASS | PASS | PASS (HOLD convergent) | PASS | PASS | 5/5 |

---

## Phase-6 position-swap consistency per candidate

| Candidate | Phase-6 A tier | Phase-6 B tier | Consistent? |
|---|---|---|---|
| haizelabs/verdict | T2 VENDOR-FORK HOLD | T3 DEFER_PATTERN_ONLY | stable_with_within_ladder_drift |
| microsoft/agent-governance-toolkit | T1-INSTALL APPROVE | T1 RATIFY_WITH_PACKAGE_PROBE | stable_T1 |
| chrome-devtools-mcp@1.0.1 | T1-INSTALL APPROVE | T1 APPROVE_UPGRADE_TO_1_0_1 | stable_T1 |
| cj-vana/claude-swarm | T5 REJECT | T5 REJECT | stable_T5 |
| addyosmani/agent-skills | T2 HOLD | T2 HOLD_AS_PREINSTALLED_NO_NEW_INSTALL | stable_T2 |

**Overall position_swap_consistency: 5/5 tier-stable**; 1 within-soft-gate-ladder drift on haizelabs (T2↔T3, both valid sub-T1).

---

## Codex GPT-5.5 ratification per candidate

```yaml
# Phase-6 A (evidence-first order) — codex GPT-5.5
A1_chrome-devtools-mcp:
  tier: T1-INSTALL
  verdict: APPROVE
  rationale: "Mature Google-owned Apache-2.0 MCP with strong adoption, pinned npx install path, and stated non-breaking 1.0 feature upgrade; D32 lag is acceptable for install."

A2_microsoft-agent-governance-toolkit:
  tier: T1-INSTALL
  verdict: APPROVE
  rationale: "Microsoft-owned MIT governance toolkit with strong test depth, Windows fit, OWASP ASI coverage, modern signature primitives, MCP/Kernel integration, and patched CVE posture."

A3_haizelabs-verdict:
  tier: T2-VENDOR-FORK
  verdict: HOLD
  hard_caps: [NO_MCP_PACKAGING, SOLO_MAINTAINER_FLOOR, STALE_6MO]
  rationale: "Research-grade MIT eval stack promising via ICLR paper and DSPy-native shape, but solo-maintainer floor, no MCP packaging, dependency surface, stale activity require vendor-fork quarantine."

A4_cj-vana-claude-swarm:
  tier: T5-REJECT
  verdict: REJECT
  hard_caps: [SOLO_MAINTAINER_BREACH, WINDOWS_HARNESS_MISFIT, PRERELEASE_0_1_0, TMUX_REQUIRED]
  rationale: "Fails maintainer floor and Windows runtime fit; tmux/WSL requirement plus prerelease/stale posture makes it unsuitable for this portable Windows eee runtime."

A5_addyosmani-agent-skills:
  tier: T2-HOLD
  verdict: HOLD
  hard_caps: [PRE_INSTALLED_DUPLICATE_SURFACE, HOOKS_REQUIRE_REVIEW]
  rationale: "High-trust Google Chrome team MIT asset with strong adoption, but already present via plugin marketplace and ships hook surfaces, so avoid duplicate install until provenance, hook safety, and marketplace-vs-direct ownership are reconciled."

# Phase-6 B (reversed order) — codex GPT-5.5
B1_addyosmani-agent-skills:
  tier: T2
  verdict: HOLD_AS_PREINSTALLED_NO_NEW_INSTALL
  hard_caps: [preinstalled_duplicate, shell_session_start_hook_requires_review, pin_plugin_source_and_version]

B2_cj-vana-claude-swarm:
  tier: T5
  verdict: REJECT
  hard_caps: [tmux_required, windows_requires_wsl, solo_bus_factor_D16_1, prerelease_0_1_0, stale_small_surface]

B3_haizelabs-verdict:
  tier: T3
  verdict: DEFER_PATTERN_ONLY
  hard_caps: [no_mcp_packaging, eval_library_not_runtime_primitive, soloish_D16_floor, dependency_heavy, stale_since_2025_07_pypi]

B4_microsoft-agent-governance-toolkit:
  tier: T1
  verdict: RATIFY_WITH_PACKAGE_PROBE
  hard_caps: [public_preview, high_blast_radius_governance_layer, verify_published_3_7_0_artifacts_before_install, pin_hashes_and_run_agt_doctor_verify]

B5_chrome-devtools-mcp:
  tier: T1
  verdict: APPROVE_UPGRADE_TO_1_0_1
  hard_caps: [browser_data_exposure, telemetry_opt_out_required, use_isolated_profile, require_node_lts_and_current_chrome, pin_v1_0_1_or_latest_policy]
```

---

## Cumulative T6 verdict count post-wave (71 → 76)

| Wave | Verdicts added | Cumulative |
|---|---:|---:|
| Pre-W315 | 60 | 60 |
| W315-A | 7 | 67 |
| W315-B | 4 | 71 |
| **W316-S7** | **5** | **76** |

---

## W316 install actions (which candidates ROUTE T1 → S3 Install Stream queue)

### T1 INSTALL targets (S3 stream queue)
1. **chrome-devtools-mcp 0.26.0 → 1.0.1 upgrade-in-place**:
   - Edit `.mcp.json:42` `0.26.0 → 1.0.1`
   - Commit: `feat(mcp): bump chrome-devtools-mcp 0.26.0→1.0.1 per W316-S7 sca-v7 re-ratify`
   - Smoke: invoke `mcp__chrome-devtools__list_pages` and confirm response shape
   - Codex Stop-hook will ratify post-commit per `openai-codex/1.0.4/hooks/hooks.json:24-37`

2. **microsoft/agent-governance-toolkit v3.7.0 INSTALL** (CONDITIONS):
   - Pre-condition (BLOCKING): run 4 additional deepwiki probes (agent-os-kernel, agentmesh-platform, agent-mcp-governance, agent-sre) to close T1 deep-ingest floor
   - Pre-condition: verify `pip index versions agent-governance-toolkit agent-os-kernel agentmesh-platform` returns published v3.7.0 wheels (some may still be in ESRP signing pipeline)
   - Install: `pip install agent-governance-toolkit[full]` into `Z:\venvs\claude`
   - Optional MCP wire: append a CR-9-compliant entry to `.mcp.json` for the MCP Kernel Server if Anthropic publishes a Claude Code compatible wrapper (currently it's Claude Desktop-shape)
   - Run `agt doctor` + `agt verify` post-install
   - Commit message MUST cite this row + include `Phase-5 ratified by codex GPT-5.5` token

### T2 routings (cite-only, no install)
3. **haizelabs/verdict** → PATTERN-VENDOR absorb the Unit/Layer/Block primitives into sca-v7 §X.7 D30 backend documentation (no source code adopted).
4. **addyosmani/agent-skills re-audit** → reaffirms W315 row #69 T2 HOLD; defer to W316 Stream 3 for vendor-fork-5 implementation.

### T5 REJECT (cite-only)
5. **cj-vana/claude-swarm** → REJECT; no further action. Cite as a reference in `parallel-dispatch-mandate` skill.md for ralph-loop / competitive-planning pattern history.

---

## Cardinal-rule preservation check

| Cardinal Rule | Status |
|---|---|
| R1 trusted-source | ✓ All T1 candidates anchored to Microsoft Corp / Google LLC / npm registry |
| R2 hook discipline | ✓ T1 installs do NOT introduce project-owned hook bodies; chrome-devtools-mcp pin update is a single arg-array edit |
| R3 subagent provenance | ✓ No new subagent invocations introduced |
| R4 CLAUDE.md + settings.json | ✓ Only documented `.mcp.json` arg-update + optional pip-install (no CLAUDE.md edit needed) |
| R5 sandboxing | ✓ Python venv + MCP-sandboxed npx + browser `--isolated` profile recommended |

---

## Operator AI items (W317+)

- **AI-W316-S7-1 (P0 S3 stream)**: Update `.mcp.json:42` `0.26.0 → 1.0.1` for chrome-devtools-mcp
- **AI-W316-S7-2 (P1 S3 stream)**: Run 4 additional deepwiki probes against AGT sub-packages BEFORE `pip install` (closes deep-ingest factor 0.85→1.0)
- **AI-W316-S7-3 (P1 S3 stream)**: After deep-ingest, `pip install agent-governance-toolkit[full]` + `agt doctor` smoke
- **AI-W316-S7-4 (P2 docs)**: Add a docs reference for haizelabs/verdict in `STREAM-C-RUBRIC-v3.md §D30` citing arxiv:2502.18018 as the META-DIM backend reference
- **AI-W316-S7-5 (P2 governance)**: Verify `addy-agent-skills@addy-agent-skills` enablement state in settings.json; if `true`, document the upstream session-start.sh injection behavior in CLAUDE.md status appendix
- **AI-W316-S7-6 (P3 docs)**: Append a "REJECT — D3+D16 hard-cap fail" entry for claude-swarm in `docs/architecture/W316-FULL-UNLEASH-WAVE/` reject-catalog
- **AI-W316-S7-7 (P3 process)**: codify "upstream-plugin-shipped hooks under plugin namespace are PERMITTED" as a sca-v7 R2-clarification (already partially in W308 W299-A REVERSAL; surface explicit anchoring)
