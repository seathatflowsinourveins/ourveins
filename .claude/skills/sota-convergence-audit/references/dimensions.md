# sca-v14 Dimension Catalog (D1-D49, D52-D65, D66, D67-D72, D73-D75 + D12 v14 swap)

> Full per-dim criteria + 3-org-distinct anchors. Loaded on-demand by sca SKILL.md.
> Composite weights live in SKILL.md §7 (composite_denom_install / composite_denom_pattern).
> v14 W337 update: D12 sub-signal swap stars-only → pattern_density_score; D73-D75 added; D67-D72 sca-v13 backfilled (was previously stale at sca-v12).

## D1-D14 (sca-v3 canonical 14)

| Dim | Name | 1-line criterion | W_install | W_pattern |
|---|---|---|---|---|
| D1 | license | OSI permissive (MIT/Apache-2 = 5; GPL = 3; proprietary = 1); per-component sub-scale (Δ38) | 1.0 | 0.5 |
| D2 | governance_health | active maintainer + recent commits + open-issue triage; Δ52 cross-corroborates against {chaoss/grimoirelab + ossf/scorecard + OWASP SAMM Governance + ISO/IEC 25010 §6} — 0 corroboration AND <500★ → cap-3; 2+ corroboration AND raw≥4 → +0.5 lift | 1.0 | 0.7 |
| D3 | claude_code_pathway | which CC primitive (plugin/skill/agent/MCP/hook/cmd); superseded by D35 broader scale | 0.8 | 0.4 |
| D4 | documentation_quality | README + USAGE + ARCHITECTURE + examples; ≥3 = 5 | 0.7 | 0.6 |
| D5 | typed_evidence_diversity | ≥3 org-distinct cite anchors; cap 4 when `cascade_degraded=true` | 1.0 | 0.7 |
| D6 | authority_weight | Bayesian author-prior; +1 for Anthropic/known-org; cap 2 unknown | 0.6 | 0.4 |
| D7 | install_cost | reversibility + footprint + env-deps; pip install = 5; system-mod = 1 | 0.7 | 0.0 |
| D8 | pattern_extractability | can pattern be vendored without full repo? Yes-trivially = 5 | 0.5 | 1.0 |
| D9 | benchmark_anchor | SOTA-on-named-benchmark with shareable EvalLog; absent = 1 | 0.7 | 0.6 |
| D10 | duplication_against_installed | inverted: 1 = full saturation; 5 = no-overlap (Δ1 live-state-probe required) | 0.8 | 0.0 |
| D11 | context_cost | preload tokens per use; ≤500 = 5; ≥5K = 1 | 0.5 | 0.3 |
| D12 | popularity_and_reusability_signal | **v14 W337**: `pattern_density_score` PRIMARY sub-signal (reusable patterns extracted ÷ repo LOC) + stars LEGACY sub-signal; cap 3 when neither pattern_density nor stars ≥2; ≥4 requires ≥3 reusable patterns (matches W336 mcp-agent-patterns precedent) | 0.3 | 0.2 |
| D13 | pattern_quality | does the pattern compose with installed primitives? | 0.6 | 1.0 |
| D14 | supply_chain | signed releases + SBOM + named CVE response | 0.8 | 0.4 |

## D16-D18 (sca-v3.1, W293)

| D16 | bus_factor_governance | ≥3 active maintainers OR foundation governance | 0.7 | 0.4 |
| D17 | robustness_under_perturbation | SWE-bench Verified pass2pass; HELM/BIG-bench fuzz survival | 0.8 | 0.5 |
| D18 | runtime_safety_and_privacy_risk | no PII exfil; sandboxed by default; explicit egress policy | 1.0 | 0.6 |

## D19-D21 (sca-v5, W299)

| D19 | code_review_rigor | 2+ reviewer requirement; PR-gate enforcement | 0.6 | 0.3 |
| D20 | doc_transparency | changelog + decision-records + ADR-style governance | 0.5 | 0.4 |
| D21 | org_diversity | ≥2 org-distinct contributors; single-org cap 3 | 0.5 | 0.3 |

## D22-D23 (sca-v6, W310)

| D22 | discovery_cascade_breadth | how many MCP families surfaced the candidate; hard_cap<2 T1 | 0.8 | 0.6 |
| D23 | decision_impact_tier | Tier-A FOUNDATIONAL → Tier-E DOC-ONLY; modulates gate strictness | 1.0 | 0.5 |

## D25-D33 (sca-v7, W314)

| D25 | agentic_safety_owasp_coverage | OWASP Top-10 Agentic Apps 2026 matrix; hard_cap<2 T1/T2 | 0.9 | 0.0 |
| D26 | content_provenance_and_incident_disclosure | SBOM + signed + VDP + CVE response | 0.7 | 0.3 |
| D27 | independent_adopter_floor | CNCF 3-adopter rule; OpenAI Preparedness PaperBench cite | 0.8 | 0.0 |
| D28 | long_running_agent_fitness | METR HCAST time-horizon (canonical slug `METR/hcast-public` per W326-G; supersedes W315-A `METR/eval-suite-hcast`); Anthropic Effective-Harnesses | 0.7 | 0.5 |
| D29 | browse_and_retrieval_quality | BrowseComp + DeepResearch-Bench + MiroEval | 0.5 | 0.3 |
| D30 | judge_on_judge_calibration_score | META-DIM: quarterly cross-judge agreement rate | 0.4 | 0.0 |
| D31 | silent_fallback_pattern_density | patterns per kLOC; hard_cap<2 T1 | 0.6 | 0.3 |
| D32 | pin_freshness_lag_norm | normalised pin lag vs upstream-latest; hard_cap<2 T1 | 0.5 | 0.0 |
| D33 | cross_source_consensus_quorum | ≥4 distinct MCP families on D1+D2+D5 with ±0.5 agreement; Δ47 frontier-retention applies on quorum_unmet | 0.8 | 0.4 |

## D34 (sca-v7.1, W316; INVERTED scale; v10 W_install bump 0.7→0.9)

| D34 | cohort_overlap_signal | 1 = no-overlap / max-positive; 5 = full saturation; T1 cap-2 if D34≥4 (v10: W_install 0.7→0.9 Stream-C Gap-3 author-prior-leak fix) | 0.9 | 0.3 |

## D36-D37 (sca-v7.2, W317; META-DIMs at W=0.0 — informational only)

| D36 | architectural_meta_evolution_pressure | rubric-itself rate-of-change cadence | 0.0 | 0.0 |
| D37 | research_arch_sota_alignment | 7-axis self-eval vs SOTA reference repos | 0.0 | 0.0 |

## D35, D38-D41 (sca-v9, W324) — CC-runtime fit

### D35 — `cc_pathway_support`

Surfaces routed: 1=none/pattern-only; 2=1 surface; 3=2; 4=3 (full plugin); 5=4+ surfaces. D35<2 caps verdict at T3.
W_install=1.0 / W_pattern=0.2.

3-org-distinct: Anthropic Claude Code plugin docs + MCP spec 2025-06-18 + wshobson/agents.

### D38 — `mcp_integration_native`

1=no MCP; 2=non-standard transport; 3=mcp__<slug>__* compat; 4=+createSdkMcpServer; 5=+native .mcp.json env-interp + Stop-hook auto-wire + smoke-test PASS.
W_install=1.0 / W_pattern=0.1.

3-org-distinct: MCP spec 2025-06-18 §Transport + Anthropic Agent SDK createSdkMcpServer + modelcontextprotocol/servers.

### D39 — `opus_4_7_compat`

1=hardcoded model-id; 5=tested Opus 4.7+4.6+Sonnet 4.6 with thinking-block + 1M-context.
W_install=1.0 / W_pattern=0.3.

3-org-distinct: Anthropic Opus 4.7 docs + Anthropic extended-thinking docs + OpenAI o1 reasoning patterns.

### D40 — `local_runtime_z_portable`

1=hardcoded C:\Users\; 5=Z:-portable + Git Bash MSYS path-rewrite safe.
W_install=1.0 / W_pattern=0.2.

3-org-distinct: XDG Base Directory + Microsoft Windows portable-app + Anthropic CCBP claude-settings.md:877-921.

### D41 — `autonomous_loop_compat`

1=interactive only; 5=Stop-hook + claude --bg + /loop cron-style autonomous re-entry.
W_install=1.0 / W_pattern=0.3.

3-org-distinct: Anthropic hooks docs + Anthropic headless docs + OWASP A07-2021.

## D42-D45 (sca-v10, W325) — research-arch corroboration

### D42 — `multi_mcp_convergence_signal`

Distinct MCP families corroborating: 1=0-1; 5=≥6. D42<2 caps T3; D42<3 caps T1.
W_install=0.6 / W_pattern=0.4.

3-org-distinct: NIST AI 600-1 MEASURE-2.7 + ISO 31000:2018 §6.4.2 + W3C VC 2.0 §Proof.

### D43 — `perplexity_research_signal`

1=empty; 3=4-8 cites; 5=≥15 cites + Sonar Pro lens.
W_install=0.4 / W_pattern=0.5.

3-org-distinct: Anthropic Citations API + ACM SIGIR IR Reference Model + NIST SP 800-184.

### D44 — `codex_round_efficiency`

1=round-N≥4 OR NEEDS-REVISION; 5=round-1 APPROVE.
W_install=0.5 / W_pattern=0.0.

3-org-distinct: IEEE 1012-2016 + ARIS arXiv:2605.03042 + OWASP A09-2021.

### D45 — `awesome_list_corroboration`

1=0 lists; 3=2 lists actively-maintained; 5=≥5 OR CNCF Landscape.
W_install=0.4 / W_pattern=0.6.

3-org-distinct: OWASP A06-2021 + CNCF Landscape + GitHub `awesome` topic.

## D46-D49 (sca-v11, W326) — INV-template + ship-round + sandbox + secret-staging

### D46 — `inv_template_compliance`

0=missing/bare-name; 3=URL-only compressed; 5=full COUNTERFACTUAL OR compliant-compressed-with-verb-and-URL.
Soft-cap: D46=0 caps at T2.
W_install=0.7 / W_pattern=0.5.

Falsifiable inverse: IF NIST SA-15(3) deprecated THEN cite-discipline STILL preserved BECAUSE IEEE 1028 §5.3.4@https://standards.ieee.org/ieee/1028/4002/.

3-org-distinct: NIST 800-53 SA-15(3) + IEEE 1028-2008 §5.3.4 + OWASP Proactive Controls v4 C9.

### D47 — `ship_round_efficiency`

1=ship-rN≥4 OR BLOCK; 3=ship-r3 APPROVE; 5=ship-r1 APPROVE. Soft-cap D47≤1 caps at T2-CHERRY.
W_install=0.5 / W_pattern=0.0.

Falsifiable inverse: IF ARIS arXiv:2605.03042 retracted THEN review-cycle-cost-metric STILL preserved BECAUSE IEEE 1012-2016 V&V independence@https://standards.ieee.org/ieee/1012/5609/.

3-org-distinct: ARIS arXiv:2605.03042 + IEEE 1012-2016 + SLSA v1.0 §Build L3.

### D48 — `sandbox_compat_probe`

1=runtime-only OR sandbox-only; 3=2/3 envs; 5=op-runtime (bash+pwsh) + codex sandbox + reviewer-fork.
Soft-cap: D48≤1 caps at T2-CHERRY.
W_install=0.6 / W_pattern=0.3.

Falsifiable inverse: IF NIST 800-115 deprecated THEN probe-portability STILL preserved BECAUSE Reproducible Builds@https://reproducible-builds.org/docs/definition/.

3-org-distinct: NIST SP 800-115 + OWASP ASVS v4.0.3 V14 + Reproducible Builds spec.

### D49 — `secret_staging_risk`

1=.tmp/+.auth.json+.env* plaintext on-disk; 3=encrypted-at-rest OR ephemeral-only; 5=OS keychain / KMS / GH Actions secrets.
Soft-cap: D49≤1 caps at T2.
W_install=0.8 / W_pattern=0.2.

Falsifiable inverse: IF OWASP A02-2021 superseded THEN cred-protection STILL preserved BECAUSE NIST 800-57 Pt.1 Rev.5 §5.2@https://csrc.nist.gov/pubs/sp/800/57/pt-1/r5/final.

3-org-distinct: OWASP A02-2021 + NIST SP 800-57 Part 1 Rev.5 + gitleaks staging-detection.

## D52-D65 (sca-v11 Stream-H extended, W326) — deep-research-dim track

> Per `docs/architecture/W326-AUDIT-WAVE/STREAM-H-SCA-V11-EXT.md`. Composite weights inherited; not all W326-final-ratified. Pattern-extract-only until per-dim ship-rounds close.

| D52 | community_health_corroboration | CHAOSS + OSSF Scorecard + OWASP SAMM + ISO/IEC 25010 cross-corroboration of D2 (Δ52 absorb) | 0.7 | 0.5 |
| D53 | sustained_release_cadence | ≥1 release/90d for ≥6 months; semantic-version discipline | 0.5 | 0.3 |
| D54 | reproducible_build_attestation | SLSA L2+ provenance attestations | 0.7 | 0.0 |
| D55 | sbom_completeness | SPDX/CycloneDX SBOM published per release | 0.6 | 0.2 |
| D56 | vulnerability_response_sla | mean-time-to-patch CVE ≤30 days | 0.6 | 0.0 |
| D57 | dependency_pin_hygiene | direct deps pinned by SHA or tag; lockfile present | 0.5 | 0.4 |
| D58 | api_stability_signal | deprecation policy + semver compliance | 0.5 | 0.5 |
| D59 | i18n_a11y_coverage | i18n + a11y test coverage when applicable | 0.3 | 0.2 |
| D60 | observability_native | OTLP/Prometheus/Langfuse-compat | 0.5 | 0.4 |
| D61 | telemetry_optionality | telemetry default-off OR explicit opt-in | 0.7 | 0.3 |
| D62 | data_residency_controls | per-region data isolation when applicable | 0.4 | 0.0 |
| D63 | governance_transparency_score | open RFC process + public roadmap | 0.5 | 0.3 |
| D64 | privacy_impact_assessment | DPIA published; PII handling documented | 0.5 | 0.0 |
| D65 | trust_signaling_overall | composite of D2+D14+D18+D52 | 0.6 | 0.2 |

## D66 (sca-v12, W328 absorb of W321 P3 Δ51) — markitdown probe-record evidence-extraction

| D66 | probe_record_evidence_extraction | Stage-0 probe-record JSON via `markitdown` canonical-Markdown evidence-extraction; D-EMP HARD GATE consumes machine-readable evidence (anti-cite-drift) | 0.4 | 0.3 |

Scoring:
- 0 = no probe-record (manual evidence-paste only)
- 3 = probe-record JSON written but not consumed by D-EMP
- 5 = probe-record consumed by D-EMP + Phase-5 Gate-5 Replayable ledger

**3-org-distinct anchors (Δ51 / D66)**:
- `https://github.com/microsoft/markitdown` — Microsoft Corp evidence-extraction primitive
- `https://csrc.nist.gov/pubs/ai/600/1/final` — NIST/US DoC MEASURE-3.1 doc evaluation
- `https://github.com/anthropics/claude-cookbooks` — Anthropic PBC research_lead_agent.md cite-anchored evidence pattern

W295 I9 EXTENDED: D66 T-skip for arch-itself (arch IS the evidence-pipeline source).

## D67-D72 (sca-v13, W332 absorb of W329-C-RESEARCH-ARCH-V8) — research-arch deep dims

> Per `docs/architecture/W332-SOTA-DISCIPLINE-CLOSURE-V2/W332-A-SCA-V13-CODIFY.md`. Backfilled in dimensions.md by W337 P0-1 (sca-v13 ship-time omission corrected per codex r1 NEEDS-REVISION).

| Dim | Name | 1-line criterion | W_install | W_pattern |
|---|---|---|---|---|
| D67 | task_adaptive_topology_fit | Candidate fits adaptive-orchestration topology (sequential/parallel/star/DAG); ≥4 requires demonstrable DAG-decomposition test; E-skip if no DAG-decomp probe | 0.6 | 0.4 |
| D68 | deliberation_first_score | Enables deliberation-before-tool-invocation per DOVA; ≥4 requires explicit meta-reasoning pre-action step; M-skip when not applicable | 0.4 | 0.3 |
| D69 | dense_rubric_constructability | Produces dense AgentObjective-style rubric (not single score); ≥4 requires ≥3 weighted sub-criteria; E-skip; T-skip arch-itself (recursive) | 0.5 | 0.4 |
| D70 | evallog_replayability | Produces replayable inspect_ai EvalLog with cross-model `model_graded_qa([claude, openai/gpt-5.5])`; 0 = no artifact; 5 = full EvalLog + position-swap + N-round aggregation; E-skip primary / M-skip fallback | 0.5 | 0.0 |
| D71 | gepa_nightly_drift_resistance | GEPA-evolved SKILL.md description fields maintain Phase-5 5-gate pass across nightly Pareto-keep cycles; ≥4 requires ≥5 consecutive cycles; E-skip primary / M-skip fallback | 0.3 | 0.2 |
| D72 | episodic_reflection_persistence | Wave-N learnings retrieve in wave-(N+5) via T6 basic-memory; ≥4 requires `note_type: sca-v13-reflection` rows + cross-wave retrieval demonstrated; M-skip | 0.4 | 0.3 |

**3-org-distinct anchors (D67-D72)**:
- D67: AdaptOrch arXiv 2602.16873 + MAS-Orchestra arXiv 2601.14652 (Salesforce AI Research) + Anthropic claude-cookbooks @ 39a350b6 `research_lead_agent.md:135-137` parallel-tool-call MUST-block
- D68: DOVA arXiv 2603.13327 + Reflexion arXiv 2303.11366 (Princeton/Northeastern/NeurIPS 2023) + Anthropic claude-cookbooks orchestrator-workers pattern
- D69: AutoSOTA Tsinghua FIB Lab (`tsinghua-fib-lab.github.io/AutoSOTA/AutoSOTA.pdf`) + AgentObjective methodology + sca-v12 §4 weighted-sum (self-cite as 3rd anchor permitted per §4 strengthening allowance)
- D70: inspect_ai UK AISI (UK AI Safety Institute, government org) + MIT license (FSF/OSI) + JudgeLM Wang+ 2023 arXiv 2310.17631 (Beihang University/Tencent)
- D71: GEPA gepa-ai @ ICLR 2026 Oral + Hermes NousResearch (Nous Research independent) + DSPy Stanford NLP
- D72: Reflexion NeurIPS 2023 (Princeton/Northeastern) + Memento-II arXiv 2512.22716 + basic-memory T6 canonical (per W295 canonical-primary)

## D73-D75 (sca-v14, W337 verdict-llm-codify) — verdict-llm + first-discovery diversity + attribution-completeness

> Per `docs/architecture/W337-CONTINUE/W337-A-SCA-V14-CODIFY.md`. New dims discharge W336 P1-1 + W335-extended P0-1 carry-forward.

| Dim | Name | 1-line criterion | W_install | W_pattern |
|---|---|---|---|---|
| D73 | multi_source_first_discovery_diversity_score | Counts DISTINCT MCP families that FIRST-DISCOVERED candidate (not just confirmed); ≥4 requires ≥2 non-github first-discoveries; anti-bias against MCP-surface popularity; M-skip if MCP-cascade not fired; measurable arch-itself | 0.7 | 0.4 |
| D74 | mcp_family_attribution_completeness | `mcp_family_attribution[]` ledger field fully populated per claim; ≥4 requires per-claim attribution + ≥3 distinct families; T-skip arch-itself (recursive — rubric IS attribution authority) | 0.5 | 0.3 |
| D75 | codex_round_cost_efficiency_ratio | Useful-verdict-insight per codex round cost ($); caps at 2 when D44=1 (round-3+); ≥4 requires 1+ APPROVE per round-1; E-skip arch-itself (recursive with D44 codex authority); M-skip fallback when telemetry unavailable | 0.3 | 0.2 |

**3-org-distinct anchors (D73-D75)**:
- D73: NIST AI 600-1 MEASURE-3.1 (NIST/US DoC measurement diversity mandate) + OSSF Criticality Score (OpenSSF/Linux Foundation multi-signal scoring) + Anthropic claude-cookbooks @ 39a350b6 `research_lead_agent.md:135-137` `<use_parallel_tool_calls>` MUST-block
- D74: ISO 19011:2018 §5.5.5 (ISO Geneva audit-trail attribution) + NIST 800-53 AU-2 (NIST/US DoC auditable-record contract) + OWASP A09:2021 (OWASP Foundation logging+monitoring discipline)
- D75: haizelabs/verdict v0.2.1 MIT (Haize Labs Inc Unit/Layer/Block Pipeline-primitive — license verified MIT per `gh api repos/haizelabs/verdict --jq .license.spdx_id` probe 2026-05-20; sca-v13 §4 Δ50 Apache-2.0 mis-cite CORRECTED) + Zheng+ 2023 MT-Bench arXiv 2306.05685 (UC Berkeley/Stanford/EPFL) + JudgeLM Wang+ 2023 arXiv 2310.17631 (Beihang University/Tencent)

**Skip-class effects (per §5.2 SKILL.md)**:
- D73 M-skip if MCP-cascade not fired (else measurable arch-itself)
- D74 T-skip arch-itself recursive attribution
- D75 E-skip arch-itself recursive with D44 codex authority

**Verdict-llm Pipeline-primitive contract** (referenced by D75; codified in sca-v12 W328 §4 Δ50 and license-corrected in sca-v14 W337):
- `codex_round = Unit(model="gpt-5.5", prompt=verdict_evidence)` (haizelabs/verdict v0.2.1 MIT)
- `codex_ensemble = Layer([codex_round], repeat=N)` adaptive N=1..3
- `phase6_gate = Block(codex_ensemble >> MaxPoolUnit)` majority-vote aggregation
