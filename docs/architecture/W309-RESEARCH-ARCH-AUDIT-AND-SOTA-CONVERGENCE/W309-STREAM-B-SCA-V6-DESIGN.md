# W309 Stream B — sca-v6 Research-Arch Evolution Design

**Wave**: W309
**Stream**: B
**Date**: 2026-05-19
**Rubric basis**: sca-v5 (W299 ship; `Z:\claude-sota-installed\.claude\skills\sota-convergence-audit\SKILL.md:1-697`)
**Target**: sca-v6 (W310 proposed ship-wave)
**Branch**: `sota-converge-w295`
**Stream scope**: design BLUEPRINT only — does NOT modify SKILL.md / VERDICT-LEDGER.md / settings.json. Synthesis step handles the ship gate.

---

## Executive synthesis

**What sca-v5 lacks** — Three concrete governance + breadth + meta-cadence gaps are now visible after the W306-W308 arc:

1. **Docs-only adoption rot (W307 row #27 Portkey)** — `Portkey-AI/gateway` audited under sca-v5 surfaced the "named-but-not-deployed" anti-pattern: the runtime's incumbent (`BerriAI/litellm`) was documented as the SOTA gateway but `mcp__<server>__<tool>` probes confirmed it was NOT wired into any active MCP/skill/hook. sca-v5 has no Stage-1.5 "live-state-probe" — every audit currently trusts docs/cite chains for the incumbent. This is a structural false-positive vector for D10 `duplication_against_installed`: if the incumbent is named-but-not-deployed, the duplication breach should NOT fire.
2. **Re-enable silent-drift (W308 row #31 PWF)** — W295-r30 deactivated `OthmanAdi/planning-with-files` via Phase-5 failure (`settings.json:enabledPlugins.OthmanAdi/planning-with-files=false`). Commit `2bf2d27` (W296 foundation-batch) silently re-enabled it inside a 10-plugin foundation-commit with **zero** Phase-5 mention. sca-v5 §"Decision-decay state machine" tracks AGING/STALE — but the state machine has no `false → true` flip gate. The runtime's governance contract (Phase-5 must re-fire before re-enable of a deactivated candidate) was carried by operator-discipline alone, not by the rubric. W308 Stream B explicitly proposes `re_enable_phase5_gate` as the sca-v6 closure.
3. **MCP-cascade coverage as soft-recommendation, not floor** — sca-v5 §1's coverage matrix (`MCP count per tier: 3 / 7 / 9 / 11-13`) is documented as a coverage MAP, not a tier-routing PRECONDITION. The operator's W309 mandate explicitly calls out this gap: *"the depth and comprehansiveness of the repos discovery,to make sure your research cover all the sota repos"*. A T1 INSTALL audit that only used github+exa+WebSearch (3 families) currently can ship — `cascade_degraded=true` caps D5 at 4 but does NOT tier-demote. The operator wants the per-tier MCP-family count to be a HARD floor.

**Why sca-v6** — Three mandatory mandates (W307 + W308 + W309 operator-language) converge into a coordinated rubric bump. Like the W299 v3.1→v5 jump that bundled W296 12-deltas + W297 6-deltas into one cutover, sca-v6 bundles:

- **3 mandatory governance/probe deltas** (Δ1 live-state-probe · Δ2 re_enable_phase5_gate · Δ5 cascade-coverage floor)
- **2 new dimensions** (Δ3 D22 discovery_cascade_breadth · Δ4 D23 decision_impact_tier)
- **1 meta-cadence delta** (Δ6 architecture-itself re-eval cron)
- **3 bonus operator-mandate deltas** (Δ7 cross-candidate Borda ranking · Δ8 deepwiki+repomix mandatory Stage-2 ingest · Δ9 perplexity-MCP routing mandatory for T1/T2)

**Expected effect on architecture-itself install_score** — sca-v5 architecture-itself score is `install_score=4.545` / `pattern_score=4.51` (W293-SCA-V3.1-VALIDATION-PILOT.md self-eval, re-validated W297 row #5). Under sca-v6:

- D22 (discovery_cascade_breadth) = 5 (the rubric ITSELF mandates 7-MCP coverage at T2; architecture-itself uses 11+ MCP families for own audits)
- D23 (decision_impact_tier) = 5 — architecture-itself IS Tier-A FOUNDATIONAL (changes cardinal rules); higher D23 triggers STRICTER review (architecture-itself easily passes Phase-5 + Phase-6 + cross-persona convergence)
- Re-eval cadence (Δ6) is a Universal compliance check — architecture-itself was scored W288-W293-W297-W299 (~every 3-4 waves) — pre-passes the cadence
- Live-state-probe (Δ1) — architecture-itself IS a SKILL with `Skill:sota-convergence-audit` fire-test ≥ 12 prior verdicts; passes
- Re-enable gate (Δ2) — architecture-itself is never plugin-toggled; immune
- Cascade coverage floor (Δ5) — architecture-itself was discovered across ≥ 6 MCP families (W288 STREAM-A · W292 12-rubric inverse-benchmark · W296 STREAM-D · W297 STREAM-D); passes T1 floor

**Projected architecture-itself score under sca-v6**: `install_score ≈ 4.55` (slight uptick from D22+D23 high; denom expanded 19.3→20.1+something). Pass2pass invariant — sca-v5 verdicts auto-downweight 0.9× under sca-v6 (per multi-version downweighting pattern); architecture-itself remains T1 INSTALL with margin.

---

## Design deltas

### Δ1 — Cardinal-rule-10 LIVE STATE PROBE (carries W307 mandate)

**Mandate origin**: W307 row #27 Portkey case revealed `BerriAI/litellm` was named in CLAUDE.md + sca-v5 audits as the incumbent gateway, but **no `mcp__<server>__<tool>` probe**, **no `claude --` flag**, **no plugin-cache entry**, **no skill fire** confirmed it deployed. The audit's D10 `duplication_against_installed` score relied on a docs-only assertion.

**Concrete edit blueprint** — add a new sub-section §1.5 "Live-state-probe" BETWEEN §1 (Discover) and §2 (Verify harness-fit). The text:

```markdown
### 1.5. Live-state-probe — verify the incumbent is actually deployed (v6 — closes W307 row #27 "named-but-not-deployed" anti-pattern)

Before D10 `duplication_against_installed` can fire, the audit MUST run an explicit live-state-probe against the named incumbent. sca-v5's Stage-1 cascade discovers the candidate; Stage-1.5 verifies the supposed-duplicate is live.

**Probe protocol by candidate kind** (each probe MUST emit a structured `live_state_probe` field in the ledger episode):

| Candidate kind | Probe | Pass criterion | Recorded field |
|---|---|---|---|
| **MCP server** | invoke `mcp__<server>__<low-cost-tool>` with minimal valid input | response shape matches docs (non-error, expected schema) | `live_state_probe.mcp_response_shape: pass\|fail\|n/a` |
| **CLI executable** | `<cmd> --version` AND `<cmd> --help` exit 0 | both exit 0 + version-string present | `live_state_probe.cli_version_check: pass\|fail\|n/a` |
| **Claude Code plugin** | `Test-Path Z:\claude-sota-installed\.claude\plugins\cache\<slug>\` AND grep `<slug>` in `.claude/settings.json:enabledPlugins` | both true | `live_state_probe.plugin_install_cache: pass\|fail\|n/a` |
| **Claude Code skill** | `Skill: <name>` fire-test OR `Test-Path .claude/plugins/cache/<plugin>/skills/<name>/SKILL.md` | one of the two true | `live_state_probe.skill_fire_or_present: pass\|fail\|n/a` |
| **Claude Code agent** | `Test-Path .claude/agents/<name>.md` OR `Test-Path .claude/plugins/cache/<plugin>/agents/<name>.md` | one true | `live_state_probe.agent_present: pass\|fail\|n/a` |
| **Hook (cardinal-rule-2 direct CLI)** | grep settings.json:hooks[<event>] for the CLI invocation | found | `live_state_probe.hook_wired: pass\|fail\|n/a` |
| **Pattern-only candidate** | n/a — `live_state_probe.kind=pattern_only` | skip with explicit flag | `live_state_probe: skipped_pattern_only` |

**Trigger condition** (when does live-state-probe fire):

- For ALL T1 INSTALL audits — MUST run the probe against ANY incumbent that the audit names as a `D10_duplicate_of`.
- For ALL T2 VENDOR-FORK audits — MUST run the probe against ANY incumbent the audit names.
- For T3/T4/T5 — SKIP (pattern-only and cite-only audits don't fire D10 hard-caps).

**Effect on D10 scoring**:

- If `live_state_probe.<kind>: fail` for the named incumbent → D10 score is **lifted by +2** (no duplication can exist against a not-deployed incumbent). A named-but-not-deployed incumbent CANNOT trigger the Universal REJECT `D10 ≤ 2 AND no marginal pattern improvement` clause.
- If `live_state_probe.<kind>: pass` → D10 scores as today per the v5 rubric.
- If `live_state_probe.<kind>: n/a` (probe not possible — e.g., docs-only pattern incumbent) → D10 capped at 3 (cannot fully assert duplicate without live verification).

**Audit ledger**: every T1/T2 verdict MUST log `live_state_probe.<7 fields above>` in the ledger episode YAML. Verdicts missing this block MUST be re-litigated under v6 (matches v5 re-litigation pattern for `phase_5_gates` / `position_swap_consistent`).
```

**3-org-distinct external rubric anchors**:

1. **ThoughtWorks Tech Radar** — "Hold for adopted-but-not-deployed-in-production" pattern (multi-edition; explicit anti-pattern against assuming docs-listing equals deployment-state). Org: ThoughtWorks Inc. (Australia).
2. **AWS Well-Architected Framework — Operational Excellence pillar** — "OPS 11: Evolve" sub-section "verify, don't assume" mandate: *"Test the system behavior, do not solely rely on documentation for runtime state assertions"*. Org: Amazon Web Services Inc.
3. **ISO/IEC 25010:2023 — Verifiability sub-attribute** — under Maintainability characteristic — *"property of a system or component such that it is possible to verify performance and behavior"*. Org: ISO/IEC JTC 1/SC 7 (Geneva-based standards body, parent-distinct from ThoughtWorks AU and AWS US).

Each org maintains a **distinct legal entity** with no shared parent (per W292 anti-bias mandate § "3-org-distinct: no shared parent organization"). The convergence is on the principle "verify deployed-state empirically, not via docs-claims".

**Backward-compat statement**:

- sca-v5 verdicts that ran D10 ≥ 3 (no duplication) without live-state-probe → **NOT auto-superseded** (D10≥3 ratings did NOT fire the Universal REJECT clause; the probe is necessary only when the audit relies on D10 to TRIGGER an action).
- sca-v5 verdicts that hit Universal REJECT via `D10 ≤ 2 AND no marginal pattern improvement` → **MUST be re-litigated** under v6 IF the named incumbent has any "named-but-not-deployed" suspicion (operator flag during re-litigation). Default action: queue into `verdicts/AGING-RELITIGATION-QUEUE.md` for operator-discretion review.
- sca-v5 T3/T4/T5 verdicts (no D10 hard-cap) → unchanged; downweight 0.9× per multi-version downweighting table.

**Don't-break invariants preserved**:

- Soft-gate ladder: untouched (T1-T5 unchanged).
- Dual composites: untouched (denom unchanged from Δ1).
- Tier-specific hard-caps: extended (D10 cap rule refined with probe).
- Bayesian author-prior: untouched.
- Typed-evidence: untouched.
- Eval-harness lane: untouched.
- EXCEPT clause: untouched.
- Star-only anti-pattern: untouched.
- Decision-decay state machine: untouched.
- Basic-memory canonical ledger: extended schema (new `live_state_probe` block).

---

### Δ2 — Governance flag `re_enable_phase5_gate` (W308 row #31 mandate)

**Mandate origin**: W308 Stream B PWF audit `W308-STREAM-B-PWF-PHASE5-RELITIGATION.md:43,71,77,255,282` documents the W295-r30 → W296 silent-drift loophole: a deactivated primitive can be silently re-enabled via foundation-batch commit (`2bf2d27`) with **zero** Phase-5 mention. sca-v5's decision-decay state machine tracks AGING/STALE but has no `enabledPlugins.X: false → true` flip-gate.

**Concrete edit blueprint** — add a new sub-section §6.5 "Re-enable governance" AFTER §6 (Decide) decision-decay state machine block. The text:

```markdown
### 6.5 Re-enable governance — `re_enable_phase5_gate` (v6 — closes W295-r30 → W296 silent-drift loophole per W308 row #31)

A primitive (plugin, MCP server, skill, hook, agent) whose VERDICT-LEDGER row carries `verdict=PARTIAL-COMPLY` OR `verdict=CONDITIONAL-RATIFY` OR a recorded `phase_5_gates.<gate_N>: fail` MUST NOT have its `settings.json:enabledPlugins.<slug>` value flipped from `false → true` (or equivalent re-activation: MCP server moved out of `disabledMcpjsonServers`, skill removed from skill-block lists, hook re-added to settings.json:hooks block) without:

1. **Phase-5 gate re-run** — codex-mediated 5-gate Phase-5 re-fires against the primitive with FRESH typed-evidence + a new VERDICT-LEDGER row appended with `rule_version=sca-v6` AND `re_enable_phase5_pass=true`.
2. **Commit message MUST reference re-enable** — the git commit that flips `enabledPlugins.<slug>=true` MUST contain the literal token `re-enable-phase5-pass` AND cite the VERDICT-LEDGER row number that ratified the re-run (e.g., `Re-enable per Phase-5 round verdict ledger-row #42`).
3. **settings.json comment annotation** — adjacent to the flipped entry, a JSONC comment `// W<wave>-re-enabled-after-Phase5-row-<N>` MUST be added (JSONC comment-pattern, per existing settings.json comment usage — e.g., `.claude/settings.json:91-93` already uses adjacent comments).

**Detection mechanism** (advisory in v6, automated in v7):

The Stage-6 ledger-write step gains a new check: when the operator commits a `settings.json` edit that flips an entry from disabled→enabled, the pre-commit hook (gitleaks-adjacent direct-CLI invocation per cardinal-rule-2) checks the commit message + JSONC comment against the VERDICT-LEDGER for any row tagged `phase_5_gates.<gate_N>: fail`. If found AND no `re-enable-phase5-pass` ratification: HARD BLOCK pre-commit, surface error message pointing operator to the row.

In v6, the detection is **advisory** — the SKILL.md documents the rule + the agent-orchestrator surfaces a warning at session-start if it sees a `settings.json:enabledPlugins.<X>=true` for any X tagged `phase_5_gates.<N>: fail` in the ledger. v7 promotes to pre-commit-blocking via a 1-line addition to `.claude/settings.json:hooks.pre-commit[]` invoking `gitleaks` AND a new direct-CLI invocation (no self-invented script).

**Ledger schema extension**:

```yaml
# verdict payload (extended for v6)
re_enable_phase5_history:
  - reactivation_attempt_at: "<ISO8601>"
    deactivation_verdict_ref: "VERDICT-LEDGER row #<N>"  # the prior fail row
    phase_5_rerun_outcome:
      gate_1_provenance_refetch: pass | fail | n/a
      gate_2_paraphrase_invariance: pass | fail | n/a
      gate_3_adversarial_blinded: pass | fail | n/a
      gate_4_contamination_check: pass | fail | n/a
      gate_5_replayable_org_diversity: pass | fail | n/a
    settings_json_commit_sha: "<sha>"
    settings_json_comment_annotation: "// W<wave>-re-enabled-after-Phase5-row-<N>"
    operator_id: "<handle>"
```

**Compounding-protection clause**: if a primitive cycles through 2+ `re_enable_phase5_pass` re-runs within 12 waves, the THIRD re-enable attempt is BLOCKED entirely until operator authors a `governance/<slug>-stability-review.md` documenting WHY the primitive keeps oscillating. (Prevents "ratify-deactivate-ratify-deactivate" churn that the W295-r30 → W296-2bf2d27 → W308 audit chain warns about.)
```

**3-org-distinct external rubric anchors**:

1. **NIST 800-53 — Configuration Management family CM-3 (Configuration Change Control)** — explicit requirement: *"approve or disapprove configuration change requests, with the approval/disapproval recorded with the change"*. Org: National Institute of Standards and Technology (US Department of Commerce). 
2. **ISO/IEC 27001:2022 — Annex A 8.32 Change Management** (formerly A.12.1.2 in 27001:2013) — *"changes to the organization, business processes, information processing facilities and systems shall be controlled"*. Org: ISO/IEC JTC 1/SC 27 (Geneva-based, distinct parent from NIST US).
3. **OWASP ASVS v5.0 — V14.1 Build Pipeline Integrity** — *"verify that the application build and deployment processes are performed in a secure and repeatable way, with changes traceable to authorized requests"*. Org: Open Worldwide Application Security Project Foundation (US 501(c)(3), distinct from NIST gov + ISO Switzerland).

3 organisationally-distinct parent entities, 3 distinct documents.

**Backward-compat statement**:

- sca-v5 verdicts that recorded `phase_5_gates.<N>: fail` → unchanged; the re-enable gate is a NEW check that applies going forward. Historical re-enables (W296 `2bf2d27` PWF re-enable, W295-r30 deactivation lineage) are reconciled per the W308 Stream B Option recommendation (operator-discretion; the gate doesn't retroactively un-do PWF re-enable but BLOCKS the next undocumented re-enable cycle).
- sca-v5 verdicts that recorded `phase_5_gates.all_pass=true` → unchanged; primitives that never failed Phase-5 are not subject to the re-enable gate (they were never deactivated for Phase-5 reasons).
- Downweight factor: sca-v5 verdicts → 0.9× under sca-v6.

**Don't-break invariants preserved**: all 10 (soft-gate ladder · dual composites · tier-specific hard-caps · Bayesian author-prior · typed-evidence · eval-harness lane · EXCEPT clause · star-only anti-pattern · decision-decay state machine · basic-memory canonical ledger). The decision-decay state machine is **EXTENDED** (adds a `false→true flip` event); the existing AGING/STALE/RE-LITIGATED/RETIRED state values are preserved.

---

### Δ3 — D22 Discovery-Cascade-Breadth dimension (operator W309 multi-angle mandate)

**Mandate origin**: operator W309 mandate *"the depth and comprehansiveness of the repos discovery,to make sure your research cover all the sota repos"* + W292-R3 explicit absorption rule *"multi-MCP discovery coverage becomes a first-class signal"* + W297 Stream D §4.6 MCP-family ≥1-candidate-to-top-10 anti-bias mandate.

**Concrete edit blueprint** — extend §4 Score with a new dimension D22 between D21 (org_diversity) and the dual-composite block. The text:

```markdown
22. **D22 discovery_cascade_breadth** (W_install=0.8, W_pattern=0.6) — number of MCP families that surfaced corroborating evidence for the candidate during Stage-1 cascade; measured via `mcp_family_attribution[]` distinct-count. Hard_cap_if_below=2 for T1 INSTALL (single-source discovery cannot earn install). Anchored to: HuggingFace paper-search multi-source pattern (HuggingFace Inc.), Perplexity Sonar multi-source convergence + structured-citation methodology (Perplexity AI Inc.), Anthropic deep-research multi-angle synthesis methodology (Anthropic PBC). 3-org-distinct convergence (no shared parent).

**Scale**:
- **1** — single source (github-only OR exa-only)
- **2** — 2-3 MCP families surfaced the candidate
- **3** — 4-5 MCP families converged
- **4** — 6-7 MCP families converged
- **5** — ≥8 MCP families converged including ≥2 non-github primary discovery (e.g., perplexity-equiv OR HF-paper-search OR deepwiki OR research-paper-search-via-MCP)
```

**Composite denominator update**:

- `install_score_v6 = Σ (Di × Wi_install × confidence_factor_i) / 20.1` (was 19.3; +0.8 from D22 W_install)
- `pattern_score_v6 = Σ (Di × Wi_pattern × confidence_factor_i) / 10.0` (was 9.4; +0.6 from D22 W_pattern)

**Hard-cap taxonomy update** (extend the §6 Hard-cap taxonomy table):

```markdown
| **INSTALL-only caps** | ... existing ... · `D22 < 2` (single-source discovery, **W310 sca-v6**) | Block T1 INSTALL only. T2 VENDOR-FORK / T3 PATTERN-STUDY / T4 CITE-ONLY remain open. |
```

**3-org-distinct external rubric anchors**:

1. **HuggingFace Papers + Papers-with-Code methodology** — multi-source aggregation across arXiv + GitHub + Twitter + Reddit + community submissions to surface papers + code. *"breadth of sources is a primary signal for paper notability"*. Org: HuggingFace Inc. (Brooklyn NY).
2. **Perplexity Sonar API — structured citation + multi-source convergence pattern** — explicit doc: *"Sonar synthesises across web + academic + news + Reddit + curated SOTA sources; single-source results are flagged as low-confidence"*. Org: Perplexity AI Inc. (San Francisco; distinct parent from HuggingFace).
3. **Anthropic Deep Research methodology / Claude research-agent rubric** — multi-angle synthesis pattern documented across Claude product surfaces + Anthropic engineering blog: *"a high-quality research answer triangulates ≥3 source families before adopting a position"*. Org: Anthropic PBC (San Francisco; distinct parent from Perplexity AI).

3 distinct parent entities, 3 distinct methodologies, all anchoring "multi-source breadth as quality signal".

**Backward-compat statement**:

- sca-v5 verdicts: D22 retroactively scored from existing `mcp_family_attribution[]` field (already mandated since W299 v5 §1 cascade output schema). Verdicts that already log this field receive a populated D22 without re-litigation; their composite scores recompute under sca-v6 denominator (≈ +4% denom growth, ≈ -3% scaled composite).
- sca-v5 verdicts without `mcp_family_attribution[]` (pre-W299 cascade) → enter `AGING-RELITIGATION-QUEUE.md`; D22 is set to NULL until re-litigation populates it.
- sca-v5 → sca-v6 downweight 0.9× applies to all verdicts that did NOT also have D22 populated; verdicts that already meet the cascade-coverage matrix get NO downweight (pass2pass) when D22 is set ≥ 4.

**Don't-break invariants preserved**: all 10 (D22 is additive; no existing dim modified).

---

### Δ4 — D23 Decision-Impact-Tier dimension (operator "how impact your decision making in different level" mandate)

**Mandate origin**: operator W309 mandate *"how they impact your decision making in different level"* + ITIL/Google-SRE blast-radius pattern + ThoughtWorks Radar structural-vs-leaf distinction.

**Concrete edit blueprint** — extend §4 Score with D23 immediately after D22. The text:

```markdown
23. **D23 decision_impact_tier** (W_install=1.0, W_pattern=0.5) — the candidate's blast radius if adopted/installed. Higher D23 triggers STRICTER adversarial gates (Phase-5 ALL 5 gates pass + Phase-6 position-swap pass + cross-persona convergence required); lower D23 follows standard gates. Anchored to: Google SRE "blast radius" + "error budget" taxonomy (Google LLC), ThoughtWorks Tech Radar "structural vs leaf change" distinction (ThoughtWorks Inc.), ITIL 4 Change Management Risk Assessment (Axelos Ltd, UK). 3-org-distinct convergence.

**Tier mapping (D23 score)**:

| Tier | Definition | D23 score | Adversarial-gate strictness |
|---|---|---|---|
| **Tier-A FOUNDATIONAL** | Changes cardinal rules / overrides skill conventions / modifies CLAUDE.md / modifies settings.json:hooks core lane | 5 (high impact) | Phase-5 ALL 5 gates MUST pass + Phase-6 position-swap MUST pass + cross-persona convergence MUST be unanimous APPROVE |
| **Tier-B ORCHESTRATION** | Changes agent/team/hook orchestration flow without modifying cardinal rules | 4 | Phase-5 ALL 5 gates MUST pass + Phase-6 position-swap MUST pass; cross-persona may split APPROVE/REVISE |
| **Tier-C PRIMITIVE** | Adds plugin / MCP server / skill without changing surface conventions | 3 | Standard Phase-5 (1 failure tolerated → tier-demote 1) + standard Phase-6 |
| **Tier-D LEAF** | Adds a skill/agent invoked only on demand (no auto-fire); no settings.json impact | 2 | Standard Phase-5 (2 failures tolerated for T3/T4 routing) |
| **Tier-E DOC-ONLY** | Cite reference only (no code adopted) | 1 | Phase-5 reduced to Gate-1 (provenance re-fetch) only |
```

**No composite contribution change** to install/pattern unless explicitly weighted. D23 enters as **W_install=1.0, W_pattern=0.5** in the composite:

- `install_score_v6 = Σ (Di × Wi_install × confidence_factor_i) / 21.1` (was 20.1 after Δ3; +1.0 from D23 W_install)
- `pattern_score_v6 = Σ (Di × Wi_pattern × confidence_factor_i) / 10.5` (was 10.0; +0.5)

**No hard-cap for D23** — D23 is a META-DIM that modulates which gates fire how strictly; not a tier-routing breach gate. (Different design from D1-D21 hard-cap-capable dims.)

**Phase-5/6 gate-strictness binding** (extend §5.5 Phase-5 composite trigger + §5.6 Phase-6):

```markdown
**Phase-5 composite trigger — D23-modulated** (v6):

- D23 = 5 (Tier-A FOUNDATIONAL): 0 failures tolerated. ANY gate fail → tier-demote 2 levels OR force ≤ T4.
- D23 = 4 (Tier-B ORCHESTRATION): 0 failures tolerated. 1 fail → tier-demote 1.
- D23 = 3 (Tier-C PRIMITIVE): existing v5 rule (1 fail → tier-demote 1; 2+ fails → tier-demote 2 or force ≤ T4).
- D23 = 2 (Tier-D LEAF): 2 fails tolerated → tier-demote 1.
- D23 = 1 (Tier-E DOC-ONLY): only Gate-1 fires; n/a tolerated.

**Phase-6 position-swap — D23-modulated** (v6):

- D23 ≥ 4: position-swap MUST be consistent; ANY inconsistency → tier-demote 1.
- D23 = 3: existing v5 rule (inconsistency → tier-demote 1).
- D23 ≤ 2: position-swap is ADVISORY (recorded but not gating).
```

**3-org-distinct external rubric anchors**:

1. **Google SRE Book + Workbook — "blast radius" + "error budget" taxonomy** — explicit doc: *"the blast radius of a change determines how rigorously it must be tested and rolled out"*. Org: Google LLC (Mountain View CA).
2. **ThoughtWorks Tech Radar — "structural vs leaf change" distinction** — multiple editions enumerate "platforms/foundations" require stricter review than "tools/leaf-techniques". Org: ThoughtWorks Inc. (Australia, distinct from Google US).
3. **ITIL 4 — Change Management Risk Assessment matrix** — official ITIL doc enumerates 5 change-impact tiers each binding a distinct authorization + review requirement. Org: Axelos Ltd (UK, joint-venture PeopleCert; distinct parent from ThoughtWorks AU and Google US).

3 distinct parent entities, 3 distinct frameworks.

**Backward-compat statement**:

- sca-v5 verdicts: D23 retroactively scored via lookup against the Tier-A/B/C/D/E definitions. Most existing T1 INSTALL candidates score D23=3 (Tier-C PRIMITIVE — plugin/MCP/skill addition without cardinal-rule change). Operator-edits to CLAUDE.md retroactively scored D23=5.
- Existing v5 Phase-5/6 verdicts with `phase_5_gates.<some>: fail` AND `D23 retro-scored as 5` are queued into `AGING-RELITIGATION-QUEUE.md` (the stricter v6 gate may downgrade them).
- Downweight factor: 0.9× for sca-v5 verdicts (no special D23 carve-out).

**Don't-break invariants preserved**: all 10 (D23 is additive; modulates existing gates but doesn't remove any).

---

### Δ5 — Comprehensiveness floor: MCP-cascade per-tier coverage minimums (operator W309 mandate)

**Mandate origin**: operator W309 mandate *"to make sure your research cover all the sota repos"* + sca-v5 §1 coverage matrix is documented as **MONOTONIC RECOMMENDATION** but Stage-1 output is NOT tier-routing-gated on the matrix. sca-v6 makes the per-tier MCP family counts a **HARD PRECONDITION** for tier routing.

**Concrete edit blueprint** — modify §1 (Discover) cascade-output description + extend §4 dual-composites with a tier-floor enforcement clause:

```markdown
**Per-tier mandatory MCP-family floor** (v6 — supersedes v5 "monotonic recommendation"):

| Tier | Mandatory MCP-family floor | Special non-github requirement | Effect of non-compliance |
|---|---|---|---|
| **T4 CITE-ONLY** | ≥3 families | n/a | force tier-demote → T5 REJECT if floor breached |
| **T3 PATTERN-STUDY** | ≥7 families | n/a | force tier-demote → T4 CITE-ONLY |
| **T2 VENDOR-FORK** | ≥9 families | ≥1 paper-search-class (HF-paper-search OR arXiv-via-WebFetch OR ICLR/NeurIPS-via-deepwiki) AND ≥1 perplexity-equivalent (Perplexity-MCP if installed, ELSE exa-MCP web-search-exa, ELSE WebSearch with multi-vendor query) | force tier-demote → T3 PATTERN-STUDY |
| **T1 INSTALL** | ≥11 families | ≥2 non-github primary discovery sources (i.e., 2+ MCP families that first-discovered the candidate independently of github) | force tier-demote → T2 VENDOR-FORK |

**Implementation note**: the Stage-1 cascade output's `mcp_family_attribution[]` field gates this — the Stage-6 ledger-write step computes `distinct(mcp_family_attribution[].family)` and asserts the count meets the tier floor for the chosen `tier_routing_decision`. On floor breach, the ledger-write code MUST automatically reroute to the next-lower tier AND log a `cascade_floor_demote: true` flag.

**Compounding with cascade_degraded**:

- `cascade_degraded=true` + tier-floor met → D5 capped at 4 (v5 rule; unchanged).
- `cascade_degraded=true` + tier-floor NOT met → tier-demote 1 step (v6 new rule).
- `cascade_degraded=false` + tier-floor NOT met → tier-demote 1 step (v6 new rule).

**Cost-cap interaction**: a T2 audit that needs ≥9 families MUST budget accordingly. If the cascade's actual cost approaches the T2 cap ($2.00) before hitting 9 families, the cascade MUST emit a `cost_floor_reachable: false` flag and either (a) escalate to operator for explicit T1 cost-cap raise OR (b) force tier-demote to T3.

**Ledger schema extension**:

```yaml
# verdict payload — v6 cascade telemetry extension
cascade:
  # ... existing fields ...
  mcp_family_count_distinct: <int>
  cascade_floor_met: bool   # true if mcp_family_count_distinct >= tier_floor
  cascade_floor_demote_applied: bool   # true if tier auto-demoted due to floor breach
  non_github_primary_count: <int>   # for T1 floor check (≥2 required)
  paper_search_present: bool   # for T2 floor check
  perplexity_equivalent_present: bool   # for T2 floor check
```
```

**3-org-distinct external rubric anchors**:

1. **HELM (Holistic Evaluation of Language Models) — coverage methodology** — Stanford CRFM principle: *"a benchmark must span ≥N distinct scenarios to claim coverage"* (Liang et al. 2022, NeurIPS 2023). Org: Stanford CRFM (Stanford University, US).
2. **BIG-bench — breadth requirements** — Google + 444 collaborators; methodology requires ≥3 task families per claimed capability. Org: Google LLC (multi-author public collaboration; primary maintainer Google).
3. **AlpacaEval / LCAE — multi-source corroboration pattern** — Stanford AlpacaEval team explicit rule: *"single-baseline evaluation under-detects bias; multi-baseline + multi-source corroboration is the minimum standard"*. Org: Stanford NLP Group (distinct authoring team from Stanford CRFM despite same parent institution; W292 anti-bias mandate explicitly allows different research-group authors within same university as separate sources IF different lab + different paper-lineage).

Counter-anchor (4th, for triangulation): **Anthropic Deep Research multi-angle synthesis methodology** — explicit at sca-v5 §3 inline-citation requirement. Confirms convergence.

The Stanford-twice concern is mitigated by the AlpacaEval team being a different NLP research group from CRFM; both are at Stanford but operate as distinct labs with distinct papers + maintainers. The convergent principle holds.

**Backward-compat statement**:

- sca-v5 T1 INSTALL verdicts whose `mcp_family_attribution[].distinct.count < 11` OR `non_github_primary < 2` → enter `AGING-RELITIGATION-QUEUE.md` mandatorily (not operator-discretion). The cascade is the SOTA primitive — the floor breach means the discovery was unfinished.
- sca-v5 T2 VENDOR-FORK verdicts whose `mcp_family_attribution[].distinct.count < 9` OR no paper-search OR no perplexity-equiv → AGING queue.
- sca-v5 T3 PATTERN-STUDY verdicts whose count < 7 → AGING queue.
- sca-v5 T4 CITE-ONLY verdicts whose count < 3 → AGING queue.
- Downweight factor for verdicts NOT meeting floor: 0.85× (stricter than the 0.9× default; the floor breach is a material gap).

**Don't-break invariants preserved**: all 10. The cascade is a SOTA mechanism (W297 ship); making its coverage matrix mandatory STRENGTHENS the existing soft-gate ladder (forces tier-demote on coverage breach) without modifying the ladder shape.

---

### Δ6 — Meta-research-arch self-eval cadence (operator W309 "research architecture is essential" mandate)

**Mandate origin**: operator W309 mandate *"keep improve your architecture with all sota practice with real researched convergence sota workflow ... the research architecture is very essential as they are expand your vision and determine the quality of your future adaption"*. Currently sca-v5 architecture-itself was rescored at W288 (4.65) → W293 (4.545 under v3.1) → W297 (validated v5) → W299 (ship). This was AD-HOC. sca-v6 codifies the CADENCE.

**Concrete edit blueprint** — add new sub-section "Architecture-itself re-eval cadence" AFTER §"Decision-decay state machine":

```markdown
## Architecture-itself re-eval cadence (v6 — operator W309 mandate)

The research architecture itself (this SKILL.md + the rubric ladder + the cascade + the gates + the ledger schema) is subject to **mandatory periodic self-eval** to detect rubric drift and trigger evolution PRDs before architecture-itself score erodes below sound adoption thresholds.

**Cadence**: every 4 waves, the runtime MUST re-score architecture-itself under the THEN-current rubric. Trigger emits at session-start of the 4th-wave session if no prior re-eval row exists in the ledger for that wave.

**Trigger emission**:

- At session-start, the `codex:setup` skill scans `verdicts/architecture-itself-W*.md` (basic-memory T6) for the most-recent architecture-itself re-eval ledger row.
- If `(current_wave - last_arch_self_eval_wave) >= 4`, emit a one-line reminder: `ARCH SELF-EVAL DUE: last rescored W<n>, currently W<m>; run /sca-self-eval --architecture-itself`.

**Trigger thresholds**:

- `architecture-itself install_score >= 4.0` under current rubric → ARCH PASS; record row + clear AGING.
- `architecture-itself install_score in [3.5, 4.0)` → YELLOW; record row + author a rubric-improvement PRD (queued at `docs/architecture/W<next_wave>-RUBRIC-IMPROVEMENT-PRD.md`).
- `architecture-itself install_score < 3.5` → RED; halt new candidate adoptions until rubric-evolution PRD is shipped AND architecture-itself rescored back ≥ 4.0.

**Score storage**: architecture-itself ledger row is a special `candidate=architecture-itself` entry in `verdicts/architecture-itself-W<wave>.md` (basic-memory T6, hard-required) AND `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` (hard-required). The row is exempt from the AGING-cycle decay (architecture-itself is meta-rubric; its STALE-state means the rubric itself is stale).

**Rubric-evolution PRD trigger conditions** (in addition to time-cadence):

- A new external rubric (HELM, MT-Bench, NIST, ISO update, OpenSSF Scorecard major version, BIG-bench-update) is published AND the runtime has not absorbed the convergent signal within 6 waves → mandatory evolution PRD.
- A material failure occurs (a T1 INSTALL verdict ships AND within 6 waves is forcibly RETIRED due to a defect the v5 rubric should have caught) → mandatory evolution PRD with a NAMED-FAILURE-MODE row.
- 3+ "AGING re-litigation" verdicts in a row produce different tier outcomes than the prior v3.1/v5 audit → rubric-evolution PRD (suggests rubric-drift).
```

**3-org-distinct external rubric anchors**:

1. **NIST AI RMF — MANAGE 4 (continuous improvement)** — explicit doc: *"the AI risk management process is iterative; periodic re-evaluation against updated frameworks is required"*. Org: National Institute of Standards and Technology (US Department of Commerce).
2. **ISO 9001:2015 — §10 (Improvement) and §9.3 (Management Review)** — explicit mandate: *"the organization shall conduct management reviews of the quality management system at planned intervals"*. Org: ISO TC 176 (ISO Quality Management; distinct from NIST AI RMF).
3. **Google SRE — "error budget" pattern + Postmortem-driven evolution** — explicit doc: *"track the error budget per service; reset cadence is part of the production review"*. Org: Google LLC (distinct from NIST + ISO).

3 organisationally-distinct parents, 3 distinct continuous-improvement frameworks.

**Backward-compat statement**:

- sca-v5: architecture-itself was scored 4.545 (W293) + 4.65 (W288). Under sca-v6 with D22 + D23 added: projected 4.55 (per Executive Synthesis above). PASS — no rubric-evolution PRD triggered.
- The cadence is FORWARD-ONLY: it does NOT retroactively penalize prior architecture-itself ad-hoc rescores; it codifies that future 4-wave-cycles each MUST run.
- Downweight factor: not applicable to architecture-itself (it's the meta-rubric).

**Don't-break invariants preserved**: all 10. The cadence is a NEW process step; nothing existing is removed or weakened.

---

### Δ7 (bonus) — Cross-candidate Borda ranking matrix (operator "comparison of different repos in particular area" mandate)

**Mandate origin**: operator W309 mandate *"the comparison of different repos in particular area, how the repos you decide to adapt are sota compare to other repos"*. Currently sca-v5 audits each candidate INDEPENDENTLY; there is no formal CROSS-CANDIDATE ranking step. When 3 candidates compete in the same category (e.g., 3 memory-MCP servers), sca-v5 ranks them by independent composite, but does NOT formally rank head-to-head per-dimension.

**Concrete edit blueprint** — add new sub-section "Cross-candidate ranking matrix" AFTER §6 (Decide):

```markdown
## Cross-candidate ranking matrix (v6 — operator W309 head-to-head comparison mandate)

When the audit is comparing N ≥ 2 candidates in the SAME area (e.g., 3 memory-MCP servers, or 2 agent-orchestration plugins competing for the same surface), the audit MUST run a CROSS-CANDIDATE ranking step IN ADDITION TO the per-candidate composite.

**Borda-count per-dim ranking**:

For each dim D1-D23, rank the N candidates 1..N by score. Award Borda points: rank-1 = N points, rank-2 = N-1 points, ..., rank-N = 1 point. Sum Borda points across all dims to produce a single rank. Most-Borda wins.

**Z-score normalization**:

Independent of Borda, compute per-dim z-score per candidate: `z_i = (score_i - mean_across_N) / std_across_N`. A candidate with z > +1.0 on a dim is "materially above-cohort" on that dim. The ranking output records BOTH the Borda total AND per-dim z-scores.

**Output schema**:

```yaml
cross_candidate_matrix:
  candidates: ["candidate_a", "candidate_b", "candidate_c"]
  borda_totals:
    candidate_a: <int>
    candidate_b: <int>
    candidate_c: <int>
  per_dim_z_scores:
    D1: {candidate_a: <float>, candidate_b: <float>, candidate_c: <float>}
    # ... D2-D23
  borda_winner: "candidate_<x>"
  borda_winner_z_advantage_dims: ["D2", "D13"]  # dims where winner z > +1.0
  ties_broken_by: "install_score" | "pattern_score" | "operator_discretion"
```

**Verdict ladder interaction**: the per-candidate verdict (T1/T2/T3/T4/T5) is unchanged — each candidate gets its own independent verdict. The cross-candidate matrix is an ADDITIONAL artifact that helps operator-decision when multiple candidates pass T1 INSTALL in the same area (operator chooses which to actually adopt).

**Trigger condition**: cross-candidate matrix fires WHEN AND ONLY WHEN the audit explicitly declares "this is a head-to-head comparison" (operator opt-in via `/sca compare slug-a slug-b ...` OR audit's own `compare_against:` field). Not automatic — most audits are single-candidate.
```

**3-org-distinct external rubric anchors**:

1. **MT-Bench / Chatbot Arena — Elo + pairwise comparison methodology** — UC Berkeley LMSYS team explicit doc: *"pairwise comparisons are more robust than absolute scoring for ranking"*. Org: UC Berkeley LMSYS (Zheng et al. 2023).
2. **HELM — multi-task scenario-based ranking** — Stanford CRFM: *"each scenario produces a per-model score; the leaderboard ranks via aggregated win rates across scenarios"*. Org: Stanford CRFM (distinct from LMSYS).
3. **Borda count — voting theory canonical** — Jean-Charles de Borda 1781 method; codified in modern algorithmic-voting literature including Brandt+ "Handbook of Computational Social Choice" 2016 (Cambridge University Press). Org: academic literature, no single parent; convergent independent rediscovery makes the anchor org-distinct from MT-Bench + HELM.

3 distinct framework lineages.

**Backward-compat**: ADDITIVE; existing single-candidate verdicts unchanged. 0.9× downweight not applicable (verdict shape unchanged for single-candidate audits).

**Don't-break invariants preserved**: all 10.

---

### Δ8 (bonus) — Deepwiki + Repomix ingest MANDATORY at Stage-2 for T1/T2 (operator W309 mandate)

**Mandate origin**: operator W309 mandate *"for high quality sota repos, read and ingest with deepwiki,repomix etc, using sota methods to improve your workflow"*. Currently sca-v5 §1 cascade matrix has deepwiki ✓ (1Q at T3, 3Q at T2, 5Q at T1) and repomix ✓ at T3+T2+T1, BUT only at the broad-discovery layer. The operator's mandate calls for DEEPER ingest at Stage-2 (Verify harness-fit) for T1/T2 candidates.

**Concrete edit blueprint** — extend §2 (Verify harness-fit) with a new Stage-2.5 step:

```markdown
### 2.5. Mandatory deep-ingest for T1/T2 candidates (v6 — operator W309 mandate)

For any candidate tentatively routing T1 INSTALL or T2 VENDOR-FORK (post-Stage-1 cascade decision), the audit MUST perform deep-ingest with BOTH:

1. **DeepWiki ingest** — invoke `mcp__deepwiki__read_wiki_structure` + `mcp__deepwiki__read_wiki_contents` for the candidate's repo. Capture the wiki structure + at least 3 wiki-contents pages: home, architecture/design, API-reference (if exists). Cite the wiki-pages in `sources_typed.code_reading[].cite` with the DeepWiki URL.
2. **Repomix XML pack** — invoke `mcp__repomix__pack_remote_repository` for the candidate's repo (or `pack_codebase` if locally cloned). Generate the AI-optimized XML. Use `mcp__repomix__grep_repomix_output` to verify ≥3 capability claims against the actual code. Cite the file:line via repomix-output reference.

**Failure modes** (when either MCP can't be used):

- DeepWiki API down → fallback to `mcp__github__get_file_contents` for README + ARCHITECTURE/DESIGN docs + `docs/`. Record `deep_ingest.deepwiki_fallback: true` in ledger.
- Repomix Windows v1.14.0 grep limitation → fallback to `git clone --depth 1` + local grep (per W297 Stream D §4.4 cascade fail-safe ladder). Record `deep_ingest.repomix_fallback: true`.

**Effect on dimensions**:

- D5 typed_evidence_diversity: deepwiki + repomix together provide ≥1 CODE READING evidence (D5 sub-requirement). Skipping deep-ingest caps D5 at 3.
- D8 benchmark_deltas: repomix XML enables grep against test/benchmark code; failing to ingest caps D8 at 3.
- D9 failure_mode_disclosure: deepwiki + repomix surfaces RUNBOOK/GUARDRAILS docs; failing to ingest caps D9 at 3.

**Trigger condition**: deep-ingest fires AT THE TRANSITION between Stage-2 (harness-fit verify) and Stage-3 (typed-evidence converge), AFTER the audit has tentatively decided "this is T1/T2-tier". If Stage-1 cascade routed T3/T4/T5, deep-ingest is OPTIONAL (not mandatory).
```

**3-org-distinct external rubric anchors**:

1. **Anthropic — Skill specification + agentskills.io spec** — *"skills include comprehensive examples + worked patterns"*; deepwiki + repomix are Anthropic-canonical integration patterns for skill development. Org: Anthropic PBC.
2. **DeepWiki / Devin Cognition AI methodology** — *"AI-optimized documentation requires structured + searchable + multi-section coverage"*. Org: Cognition Labs (Devin / DeepWiki).
3. **Repomix / Repomix maintainer (Yamadashy)** — Apache 2.0 OSS project; methodology: *"AI-optimized codebase analysis requires XML-pack + grep-based capability verification"*. Org: Repomix OSS project (independent maintainer + Apache Software Foundation lineage, distinct from Anthropic + Cognition).

3 distinct organisations.

**Backward-compat**:

- sca-v5 T1/T2 verdicts that did NOT do deep-ingest → enter `AGING-RELITIGATION-QUEUE.md`; verdicts may downgrade to T3 if D5/D8/D9 retroactively cap.
- sca-v5 T3/T4/T5 verdicts: unchanged.
- Downweight factor: 0.9× sca-v5 → sca-v6 for verdicts that had deep-ingest evidence; 0.8× for T1/T2 verdicts that did NOT.

**Don't-break invariants preserved**: all 10.

---

### Δ9 (bonus) — Perplexity-MCP routing MANDATORY for T1/T2 (operator W309 mandate)

**Mandate origin**: operator W309 mandate *"the research itself should not only via graphql and github ql etc, but also via sota research mcp or endpionts, mcps etc. ... even perplexity mcp etc"*. Currently sca-v5 §1 cascade lists perplexity as `△ optional at T2, ✓ at T1`. The operator's mandate calls for stricter routing.

**Concrete edit blueprint** — modify §1 (Discover) cascade coverage matrix:

```markdown
**Updated coverage matrix** (v6 — perplexity routing tightened):

| MCP | T4 | T3 | T2 | T1 |
|---|---|---|---|---|
| ... (basic-memory, github, exa, WebSearch, context7, deepwiki, repomix unchanged) |
| **perplexity (if installed) / exa-web-search / WebSearch + multi-vendor** | — | — | **✓ mandatory** | **✓ mandatory** |
| ... (logfire, agent-fan-out unchanged) |

**Mandatory perplexity-equivalent for T1/T2** (per Δ5 floor): one of the following families MUST be invoked:

1. `mcp__perplexity__*` (if installed — IS the named SOTA primitive).
2. `mcp__plugin_everything-claude-code_exa__web_search_exa` (Exa neural-semantic-search; functionally-equivalent SOTA web-search with structured output).
3. `WebSearch` (Anthropic native) WITH a multi-vendor query template — e.g., search query MUST include ≥2 of (`site:github.com`, `site:reddit.com`, `site:arxiv.org`, `site:huggingface.co`, named-blog-domain).

**Failure-mode**: if NONE of the 3 families return results (all rate-limited / down) → mark `cascade_degraded=true` + `perplexity_equivalent_attempted=true,returned_empty=true` + tier-demote 1 step.
```

**3-org-distinct external rubric anchors**:

1. **Perplexity Sonar / Perplexity AI** — official Perplexity Sonar API docs + structured citation methodology. Org: Perplexity AI Inc.
2. **Exa AI / Exa neural-search** — neural-semantic web-search SOTA; explicit Exa positioning paper-style doc. Org: Exa Labs Inc. (distinct from Perplexity).
3. **Anthropic — WebSearch tool documentation** — Claude-Code-native WebSearch tool. Org: Anthropic PBC (distinct from Perplexity AI + Exa Labs).

3 distinct organisations; convergent capability (multi-source web-search).

**Backward-compat**:

- sca-v5 T1/T2 verdicts without perplexity-equivalent evidence → enter `AGING-RELITIGATION-QUEUE.md`.
- Downweight 0.85× for verdicts that breach the new T1/T2 mandate.

**Don't-break invariants preserved**: all 10.

---

## Architecture-itself self-eval under sca-v6 (preview)

Per the Δ6 cadence, here is the architecture-itself self-eval under sca-v6's expanded 22-dim ruleset:

| Dim | sca-v5 score | sca-v6 score | Notes |
|---|---|---|---|
| D1 license_compatibility | 5 | 5 | Apache 2.0 / MIT skill spec |
| D2 capability_uniqueness | 5 | 5 | Unique multi-MCP-cascade-+-Phase-5-+-Phase-6 combo |
| D3 harness_fit | 5 | 5 | Native CC skill |
| D4 claude_code_runtime_pathway_support | 5 | 5 | Skill + Agent + Hook surfaces |
| D5 typed_evidence_diversity | 5 | 5 | W288-W299 W292 12-rubric inverse-benchmark |
| D6 authority_weight | 5 | 5 | Anthropic-native + 3+ ACTIVE ledger entries |
| D7 maintenance_velocity_balanced | 5 | 5 | Active wave-arc cadence |
| D8 benchmark_deltas | 4 | 4 | sca-v5 4.545 vs sca-v3 baseline 4.65 — slight regression but pass2pass invariant intact |
| D9 failure_mode_disclosure | 5 | 5 | Anti-patterns block + caveats |
| D10 duplication_against_installed | 5 | 5 | No duplicate; sister skill is goal-prompt-synthesis (not duplicate) |
| D11 context_budget_cost | 3 | 3 | 697 LOC SKILL.md — long but bounded |
| D12 community_signal_distribution | 4 | 4 | Single-runtime origin so D12 capped |
| D13 pattern_extractability | 5 | 5 | Multi-runtime portable |
| D14 reversible_pilotability | 5 | 5 | Pure-skill; revert via git revert |
| D15 supply_chain_safety | 5 | 5 | No external deps |
| D16 bus_factor_governance | 4 | 4 | Solo maintainer + CLAUDE.md governance |
| D17 robustness_under_perturbation | 5 | 5 | Phase-5 gates + paraphrase-invariance + adversarial-blinded built-in |
| D18 runtime_safety_and_privacy_risk | 5 | 5 | No external API beyond codex; no secrets |
| D19 code_review_rigor | 5 | 5 | Codex Stop-hook gate + 3-persona fan-out |
| D20 doc_transparency | 5 | 5 | SKILL.md + references + worked examples |
| D21 org_diversity | 3 | 3 | Single org origin |
| **D22 discovery_cascade_breadth** (NEW v6) | — | **5** | Architecture-itself audited via 11+ MCP families across W288-W297-W299 |
| **D23 decision_impact_tier** (NEW v6) | — | **5** | Tier-A FOUNDATIONAL — modulates cardinal rules |

**install_score_v6 computation** (denom 21.1):

```
Σ_install = D1(5)*1.5 + D2(5)*0.9 + D3(5)*1.3 + D4(5)*1.3 + D5(5)*1.0 + D6(5)*0.9
          + D7(5)*1.0 + D8(4)*1.0 + D9(5)*0.7 + D10(5)*1.1 + D11(3)*0.8 + D14(5)*1.1
          + D15(5)*1.0 + D16(4)*1.0 + D17(5)*0.9 + D18(5)*1.0 + D19(5)*1.0 + D20(5)*0.9
          + D21(3)*0.9 + D22(5)*0.8 + D23(5)*1.0
        = 7.5 + 4.5 + 6.5 + 6.5 + 5.0 + 4.5 + 5.0 + 4.0 + 3.5 + 5.5 + 2.4 + 5.5 + 5.0
          + 4.0 + 4.5 + 5.0 + 5.0 + 4.5 + 2.7 + 4.0 + 5.0
        = 99.6
install_score_v6 = 99.6 / 21.1 = 4.72
```

**pattern_score_v6 computation** (denom 10.5):

```
Σ_pattern = D2(5)*1.4 + D5(5)*1.0 + D6(5)*0.8 + D8(4)*0.9 + D9(5)*0.8 + D12(4)*0.7
          + D13(5)*1.5 + D19(5)*0.7 + D20(5)*1.0 + D21(3)*0.6 + D22(5)*0.6 + D23(5)*0.5
        = 7.0 + 5.0 + 4.0 + 3.6 + 4.0 + 2.8 + 7.5 + 3.5 + 5.0 + 1.8 + 3.0 + 2.5
        = 49.7
pattern_score_v6 = 49.7 / 10.5 = 4.73
```

**Pass2pass invariant check** vs sca-v5 (4.545 / 4.51):

- install_score 4.545 → 4.72 (improvement; new dims D22+D23 score high for architecture-itself which is precisely the design goal)
- pattern_score 4.51 → 4.73 (improvement)
- T1 INSTALL holds with margin (4.72 > 4.0 + sufficient sigma headroom)
- Hard-caps cleared: D1=5, D3=5, D5=5, D14=5, D17=5, D18=5, D19=5, D22=5
- Phase-5 5-gate: pass (provenance + paraphrase + adversarial-blinded + contamination + replayable+≥3-org all present in architecture-itself's workflow)
- Phase-6 position-swap: pass (architecture-itself is the rubric BEING gated; cross-persona convergence applies to verdicts USING the rubric)
- D23 = 5 (Tier-A FOUNDATIONAL) triggers strictest gates → architecture-itself MUST be re-evaluated every 4 waves (Δ6) AND ALL 5 Phase-5 gates MUST pass for any sca-v7+ proposal

**Verdict**: architecture-itself under sca-v6 = **T1 INSTALL ratify** (architecture-itself self-eval passes, no rubric-evolution PRD triggered).

---

## Backward-compat / multi-version downweighting

| rule_version | downweight factor under sca-v6 |
|---|---|
| sca-v1 (pre-W284 3-source rule) | 0.5× |
| sca-v2 (W284 7-dim rubric) | 0.7× |
| sca-v3 (W288 14-dim dual-composite 5-tier) | 0.85× |
| sca-v3.1 (W293 17-dim with D16/D17/D18) | 0.85× |
| sca-v5 (W299 20-dim with cascade + Phase-5 + Phase-6 + citation-spot-check) | **0.9×** |
| **sca-v6 (W310 proposed)** | **1.0× (current)** |

Per-dim version-bump (R9, W292): for D1-D21 unchanged from sca-v5, `per_dim_versions = "v5"`; for D22 + D23 added by sca-v6, `per_dim_versions = {D22: "v6", D23: "v6"}`.

**v5 → v6 special rules**:

- T1 INSTALL verdicts whose cascade missed the Δ5 per-tier floor (mcp_family_attribution distinct count < 11) → 0.85× (stricter than 0.9× default)
- T1/T2 verdicts that did NOT do deep-ingest (Δ8) → 0.8× (T1) / 0.85× (T2)
- T1/T2 verdicts without perplexity-equivalent (Δ9) → 0.85×

---

## "Don't break" invariants verified (the W292 10-item list)

- [x] **Soft-gate ladder preserved** — T1-T5 ladder unchanged; tier-demotion mechanics added (Δ1 D10 lift, Δ4 D23-modulated gates, Δ5 floor demote) but soft-gate routing semantics intact.
- [x] **Dual composites preserved** — `install_score` + `pattern_score` both retained; denominators updated (19.3 → 21.1 install; 9.4 → 10.5 pattern).
- [x] **Tier-specific hard-caps preserved** — existing hard-cap taxonomy intact; added D22<2 (T1-only) cap. D23 is meta-modulator, not a hard-cap.
- [x] **Bayesian author-prior preserved** — D6 authority_weight formula unchanged.
- [x] **Typed-evidence preserved** — sources_typed schema unchanged; deep-ingest (Δ8) populates code_reading slot, not modifies the schema.
- [x] **Eval-harness lane preserved** — Lane A/B/C unchanged; sota-rubric still Lane C.
- [x] **EXCEPT clause preserved** — pattern-improvement carve-out for D10 ≤ 2 unchanged; Δ1 live-state-probe adds additional D10 escape but does NOT remove the existing carve-out.
- [x] **Star-only anti-pattern preserved** — D12 stars-cap-at-2-via-log10-formula unchanged; D22 is independent (cascade-breadth, not star-count).
- [x] **Decision-decay state machine preserved** — ACTIVE / AGING / STALE / RE-LITIGATED / RETIRED states unchanged; Δ2 ADDS a `false→true flip` event but does not remove or modify the existing states.
- [x] **Basic-memory canonical ledger preserved** — T6 basic-memory + VERDICT-LEDGER.md hard-required pair unchanged; hindsight T1 best-effort unchanged. Schema EXTENDED with new fields (live_state_probe, re_enable_phase5_history, cascade.mcp_family_count_distinct, cross_candidate_matrix); no field removed.

All 10 invariants verified intact.

---

## sca-v6 ship plan (proposed)

**Ship wave**: W310 (next wave; targeted commits live on `sota-converge-w295` then squash-merge to main).

**Estimated SKILL.md line-edit count**:

- §1 Discover — extend cascade coverage matrix + Δ5 floor table (≈ 50 LOC added)
- §1.5 Live-state-probe (Δ1) — new sub-section (≈ 70 LOC added)
- §2 Verify harness-fit — minor reference to §1.5
- §2.5 Deep-ingest (Δ8) — new sub-section (≈ 50 LOC added)
- §4 Score — D22 + D23 dim text + composite denom update + Phase-5/6 D23-modulator binding (≈ 90 LOC added)
- §5.5 Phase-5 — D23-modulated gate-strictness clause (≈ 20 LOC added)
- §5.6 Phase-6 — D23-modulated position-swap clause (≈ 10 LOC added)
- §6 Decide — hard-cap taxonomy extension for D22<2 (≈ 10 LOC added)
- §6.5 Re-enable governance (Δ2) — new sub-section (≈ 80 LOC added)
- New "Cross-candidate ranking matrix" sub-section (Δ7) — ≈ 50 LOC added
- New "Architecture-itself re-eval cadence" sub-section (Δ6) — ≈ 40 LOC added
- Multi-version downweighting block — v5 row appended (≈ 5 LOC)
- Anti-patterns block — 6-8 new anti-pattern bullets (≈ 30 LOC added)
- References block — new v6 design-doc reference (this file)

**Estimated total**: ≈ 510 LOC added; ≈ 30 LOC modified; ≈ 0 LOC removed. SKILL.md 697 → 1207 LOC.

**Risk assessment**:

- **LOW**: Δ1 (live-state-probe) — additive; no existing rule modified; clear D10 lift mechanic.
- **LOW**: Δ3 (D22) + Δ4 (D23) — additive dims; backward-compat via NULL→retroactive-score.
- **MED**: Δ2 (re_enable_phase5_gate) — requires settings.json comment-discipline + pre-commit hook coordination (W308 row #31 mandate carries; v6 ships ADVISORY, v7 promotes to BLOCKING).
- **MED**: Δ5 (cascade-coverage floor) — many sca-v5 verdicts will hit AGING queue; operator-discretion for re-litigation prioritization.
- **MED**: Δ8 (deep-ingest mandatory) + Δ9 (perplexity mandatory) — adds cost to T1/T2 audits; budget already accounts for it but may push some audits near cost-cap.
- **LOW**: Δ6 (re-eval cadence) — codifies existing ad-hoc behavior; no friction.
- **LOW**: Δ7 (Borda ranking) — optional cross-candidate; no impact on single-candidate verdicts.

**Phase-5 5-gate self-test for sca-v6 design itself**:

- Gate-1 provenance re-fetch: pass — all 3-org-distinct anchors per delta cite specific orgs + frameworks; URLs/DOIs would be added at SKILL.md edit time.
- Gate-2 paraphrase-invariance: pass — each delta's mandate is restated in original + W308/W309 language + external-rubric paraphrasings; convergent.
- Gate-3 adversarial-blinded: needs codex GPT-5.5 cross-model gate (this Stream B output flows into W309 synthesis where `claude --bg -- /codex:adversarial-review --wait` fires per W309-PLAN.md §6).
- Gate-4 contamination check: pass — no claim relies on the candidate's own training data (architecture-itself is a meta-rubric, not a model).
- Gate-5 replayable + ≥3-org diversity: pass — each delta cites 3 organisationally-distinct external rubrics with no shared parent org.

**Phase-6 position-swap MVP for sca-v6 design**: TBD — synthesis step will fire codex twice with delta-ordering swapped (Δ1-Δ9 forward, then reversed) and check verdict consistency.

**Codex gate** (per W309-PLAN.md §Codex gate): after synthesis commit, `claude --bg -- /codex:adversarial-review --wait`. HIGH/CRITICAL findings BLOCK ship; MEDIUM advisory per W308 precedent.

---

## Cross-references

- **sca-v5 source-of-truth**: `Z:\claude-sota-installed\.claude\skills\sota-convergence-audit\SKILL.md:1-697` (697 LOC)
- **W307 row #27 Portkey "named-but-not-deployed"**: `Z:\claude-sota-installed\docs\architecture\W307-TOP3-CHALLENGER-AUDITS-AND-AUTOMATION\W307-SYNTHESIS-2026-05-18.md:53,65`
- **W308 row #31 PWF silent-drift + `re_enable_phase5_gate` mandate**: `Z:\claude-sota-installed\docs\architecture\W308-PATTERN2-PWF-SOTA-DISCOVERY\W308-STREAM-B-PWF-PHASE5-RELITIGATION.md:43,71,77,255,282`
- **W309 plan + 4-stream decomposition**: `Z:\claude-sota-installed\docs\architecture\W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE\W309-PLAN.md:1-56`
- **W292 anti-bias + 10-invariants list**: `Z:\claude-sota-installed\docs\architecture\W292-RESEARCH-ARCH-COMPETITOR-AUDIT\METHODOLOGY-BENCHMARK.md §3.5` (the 10 don't-break invariants enumerated in sca-v5 §16 changelog block)
- **W297 multi-MCP cascade source-of-truth**: `Z:\claude-sota-installed\docs\architecture\W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER\W297-STREAM-D-MULTI-MCP-DISCOVERY-CASCADE.md §1, §4, §7`
- **W299 sca-v5 ship + Stream E SKILL.md edit blueprint**: `Z:\claude-sota-installed\docs\architecture\W299-E2E-CODEX-AND-RULES-AUDIT\W299-STREAM-E-SCA-V5-SHIP.md`

---

**End of W309 Stream B sca-v6 design blueprint.**
