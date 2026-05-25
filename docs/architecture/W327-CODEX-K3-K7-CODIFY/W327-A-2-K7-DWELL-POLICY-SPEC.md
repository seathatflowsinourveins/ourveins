# W327-A-2 — K-7 P0 Dwell-Threshold Escalation Policy (3-wave / 5-wave / 8-wave)

**Date**: 2026-05-19  **Wave**: W327 Stream A  **Status**: DRAFT (codex round-N PRE-APPROVE pending)
**Remediates**: W326 codex GPT-5.5 K-7 (MED, CODEX-FRESH) per `W326-D-2-CODEX-DEEP-AUDIT-OUTPUT.md:144-161` + W326-D-3 anti-bias gate `:72-78` (PASS-WITH-OBSERVATION; INTERNAL-DOMINANT external-anchoring requires cite-strengthening)
**Convergent prior-wave finding**: 7+ P0 SHIP-BLOCKER items have carried W316-S1 → W325 → W326-D (8 waves); R5 SHIP-BLOCKER specifically demonstrates architectural deadlock pattern

---

## §1. Problem statement (codex K-7 verbatim, anti-bias-ratified)

> "R5, Perplexity rotation, ECC update, and `claude doctor` EXIT-0-silent have persisted across enough waves that 'carry-forward' is now masking a queueing failure. Some items are operator-bound and some are AI-bound, but the architecture does not force conversion into accepted risk, owner escalation, or stop-the-line remediation after a dwell threshold." (codex round-13, W326-D-2:151-152)

**Convergent symptom data** (W326-D-1 + prior waves):
- R5 SHIP-BLOCKER: 6 waves persistent (W316-S1 + W314-E + W316-S4 + W316-S5-L7 + W317-S1 + W319-D + 8-wave restatement W325-W326)
- Perplexity rotation: 7 waves persistent (W319 SEV1 incident → W325 + W326)
- ECC interactive update: W321-4 → W325 → W326 (3 waves)
- `claude doctor` EXIT-0-silent: 6 waves persistent (W319-D + W325)
- TAVILY/EXA key population: W324 → W326 (2 waves)

**Codex inverse-test outcome** (W326-D-2:154): "A GPT-5.5 runtime with eight-wave P0 dwell and no escalation state machine would get the same process finding." → orchestrator-independent; architecture-level process failure.

---

## §2. Proposed escalation policy

### §2.1 Three-tier dwell-threshold ladder — REVISED per codex round-14

**Codex-r14 revision applied (W327-A-4 §5.2)**: 5-wave override discipline clarified — operator override permitted ONLY via explicit accepted-risk ledger disposition; silent carry-forward beyond 5-wave threshold is policy violation.

| Threshold | Trigger | Required action | Enforcement mode |
|---|---|---|---|
| **3-wave dwell** | P0 entry carries 3 consecutive waves | MUST appear in next-wave closure with: explicit owner (AI / operator / shared) + ETA (specific date OR specific wave-N) + next-irreversible-action (concrete next step that cannot be re-deferred) | Wave-N closure-synthesis MUST cite the 3-wave-dwell list; non-citation = audit failure |
| **5-wave dwell** | P0 entry carries 5 consecutive waves | AUTO-ESCALATE: (a) operator-decision-block invoked at next-wave START (operator MUST explicitly disposition: ACCEPT-AS-RISK, REASSIGN, ACTION-NOW, or DEFER-WITH-CAUSE); (b) basic-memory note `W<wave>-DWELL-ESCALATION-<slug>` written; (c) W-wave docket entry auto-fires. **Codex-r14 override discipline**: operator override is permitted ONLY via explicit accepted-risk ledger disposition (`dwell_disposition: accept-risk` + signed annotation in T6 basic-memory); **silent carry-forward beyond 5-wave threshold is policy violation** (audit-failure flag on wave-N closure-synthesis). | SessionStart-equivalent reminder: operator-AI relay surfaces dwell-list before any new wave-N work; OPS-* class operator-actions surfaced first |
| **8-wave dwell** | P0 entry carries 8 consecutive waves | SHIP-BLOCKER PROMOTION: composite-architecture-quality penalty applied (-0.5 per 8-wave P0 dwell row); BLOCK new T1 installs UNRELATED to the dwell-P0 (focus discipline); REQUIRE accepted-risk signing OR full-remediation-wave dedicated | sca-v11 §7 ship-gate amendment: install_score floor +0.5 penalty for arch-itself when 8-wave dwell present |

### §2.2 Operator-bound vs AI-bound distinction

Per W326-D-2:151 codex split, dwell items have two classes:

| Class | Definition | 3-wave action | 5-wave action | 8-wave action |
|---|---|---|---|---|
| **AI-bound** (Claude/codex can action without operator) | AI has authority + tools | next-wave SLA: action OR explicit-defer-with-cause | Auto-redispatch in dedicated stream | BLOCK other work; dedicated remediation wave |
| **Operator-bound** (requires keystrokes / decision / external account) | Examples: Perplexity rotation, TAVILY key, basic-memory v3 reconcile, R5 sandbox-architecture decision | Operator-mailbox notification; AI continues; flag remains visible | Operator-decision-block at wave START; operator MUST disposition | Promote to SIGNED-ACCEPTED-RISK with falsifiable-inverse claim OR shipping-pause |

### §2.3 Current arch-state under proposed policy (W326-D snapshot)

| Dwell item | Waves | Class | Policy state | Required W327+ action |
|---|---|---|---|---|
| R5 SHIP-BLOCKER (bypassPermissions:true + sandbox:false) | 8 | operator-bound | **8-WAVE**: SHIP-BLOCKER promote, T1-install-BLOCK, accepted-risk signing OR remediation-wave | W327 Stream B AI-1 (per W326-D-5) addresses |
| Perplexity API rotation (W319-SEV1) | 7 | operator-bound | **5-WAVE+**: operator-decision-block at next wave start, basic-memory note pending | Operator W327+ action: rotate key OR mark ACCEPTED-RISK |
| `claude doctor` EXIT-0-silent | 6 | AI-bound (parser wrap) + operator-bound (upstream issue) | **5-WAVE+**: AI-side action paste-ready (W326-D-5 AI-7 step 2); operator-side upstream-issue file | W327: ship parser-wrap; operator: file upstream issue |
| ECC interactive update | 3 | operator-bound | **3-WAVE**: owner=operator; ETA: next interactive session; next-action: `/plugin update everything-claude-code agent-teams` | Operator W327+ action |
| TAVILY/EXA key population | 2 | operator-bound | Below 3-wave threshold; no escalation yet | None |
| basic-memory v0.21.1 → v3.3.1 reconcile | 2 | operator-bound | Below 3-wave threshold | None |
| statusLine hardcoded path (settings.json:206) | 4 | AI-bound | **3-WAVE**: owner=AI; ETA: W327-W328; action: env-var-substitute (W326-D-5 OPS-7) | W327+ AI action |
| sca-v9 denom math fix 33.7→34.7 (OPS-8) | 1 (corrected W326-B-1) | AI-bound | Below threshold; resolved this wave | None |

**Critical**: under proposed policy, **R5 + Perplexity + claude-doctor would trigger 5-wave or 8-wave escalation IMMEDIATELY at W327 start**. Operator-decision-block fires at W328 entry until dispositioned.

---

## §3. External anchors (3 org-distinct per W295 I1)

### §3.1 Google SRE Error Budget Policy (Google LLC)

- **URL**: https://sre.google/workbook/error-budget-policy/ (verified HTTP 200 W327 cite-pass)
- **Org**: Google LLC (SRE division)
- **Anchor**: Google's canonical Error Budget Policy. Direct quote from Google SRE Book / Workbook: "If the service has exceeded its error budget for the preceding four-week window, [Google] will halt all changes and releases other than P0 issues or security fixes until the service is back within its SLO." Additionally: "If a single incident consumes more than 20% of error budget over four weeks, then the team must conduct a postmortem. The postmortem must contain at least one P0 action item to address the root cause."
- **Application to K-7**: Google SRE error budget freeze = direct analog of sca-v11 "8-wave dwell = BLOCK new T1 installs UNRELATED to dwell-P0". Both policies enforce: when a dwell-class problem persists beyond threshold, halt new feature work and focus on the dwell. Time-window (4-week SRE) ↔ wave-window (8-wave sca). Policy structure identical; metric different.

### §3.2 Atlassian Kanban WIP Limits + Queue Aging Escalation (Atlassian Inc.)

- **URL**: https://www.atlassian.com/agile/kanban/wip-limits (verified HTTP 200 W327 cite-pass)
- **Org**: Atlassian Inc. (Jira/Confluence creator)
- **Anchor**: Atlassian's canonical Kanban WIP-limit + queue-aging guidance. Quote: "WIP limits make blockers and bottlenecks visible, allowing teams to swarm around blocking issues to get them understood, implemented, and resolved." Queue aging is the named metric: "queue aging measures how long a single issue has already spent in any 'In Progress' status... aging items signaling problems—they might be blocked or more complex than expected." Atlassian's broader pattern: automatic escalation when WIP items exceed aging threshold (e.g., "drawings that exceed a 7-day waiting period are flagged for managerial review").
- **Application to K-7**: WIP-limit + queue-aging escalation is the Kanban-domain analog of sca-v11 dwell-threshold escalation. Both: (a) make stuck-work visible; (b) escalate when dwell exceeds threshold; (c) require swarming to clear bottleneck before new work admitted. Direct method-import.

### §3.3 ITIL v4 Escalation Management + Problem Management (Axelos / PeopleCert) — REVISED per codex round-14

**Codex-r14 revision**: DORA removed from primary 3-org-distinct list (collapses under Google parent post-2018 acquisition); ITIL stands alone as 3rd primary anchor. DORA stays as supporting-secondary cite only.

- **URL**: https://wiki.en.it-processmaps.com/index.php/Incident_Management (verified HTTP 200 W327 cite-pass) — IT Process Maps wiki canonical reference
- **Org**: Axelos Ltd. / PeopleCert (ITIL trademark holder; PeopleCert acquired Axelos 2021)
- **Anchor**: ITIL v4 prescribes escalation rules: "Escalation rules are defined as a set of rules creating a hierarchy for escalating incidents, with triggers usually based on incident severity and resolution times" (per IT Process Maps wiki summary citing ITIL 4 practices). Functional escalation (specialist team) vs hierarchical escalation (management) on dwell-threshold breach. ITIL Problem Management: "reduce the likelihood and impact of incidents by identifying causes of incidents as well as managing workarounds and known errors."
- **Application to K-7**: ITIL functional/hierarchical escalation = direct analog of sca-v11 3-wave/5-wave/8-wave thresholds. ITIL: (a) defines explicit dwell thresholds; (b) escalates to higher authority on breach; (c) requires resolution OR explicit-acceptance pathway.
- **Supporting-secondary cite (codex-r14: not org-distinct from K7-A Google)**: DORA MTTR https://dora.dev/guides/dora-metrics/ provides tiered MTTR targets (Elite <1h, High <1d, Medium <1w, Low >1w) — directionally consistent with dwell-threshold ladder; counts UNDER Google org per codex-r14 ruling, NOT as separate 3-org-distinct anchor.

### §3.4 Supplementary 4th anchor (over-coverage) — CISA / ISO 27035 Incident Management Maturity

- **URL**: https://www.iso.org/standard/65694.html (ISO 31000:2018, verified HTTP 200 W327 cite-pass) — broader risk-management context
- **Org**: International Organization for Standardization
- **Anchor**: ISO 31000:2018 risk-management framework includes treatment-monitoring and escalation provisions: "the risk assessment process may be influenced by a divergence of opinions, biases, perceptions of risk and judgements" — argues for explicit escalation state machines to defeat dwell-fatigue bias.
- **Application to K-7**: Provides cross-domain coverage (risk-management ↔ SRE ↔ Agile ↔ ITSM) showing dwell-threshold escalation is a universal SOTA pattern, NOT domain-specific.

---

## §4. Codex round-N inverse-test pre-flight (anti-bias-self-check)

### §4.1 Counterfactual: would the same 3/5/8-wave thresholds be required under GPT-5.5-primary runtime?

YES. The threshold numbers are tunable (cite-anchored alternatives: Google SRE uses 4-week window; ITIL uses time-based not iteration-based; Kanban uses item-count + aging), but the PRINCIPLE — explicit dwell-threshold ladder with escalating consequences — is orchestrator-independent. Codex's own framing (W326-D-2:154 inverse-test "Yes") confirms.

### §4.2 Counterfactual: are 3/5/8 specific values defensible (vs alternatives like 2/4/6 or 5/10/20)?

DEFENSIBLE BUT TUNABLE. The 3/5/8 cadence matches:
- 3-wave = "saw it twice, third time it's a pattern"
- 5-wave = "Fibonacci-style escalation; SRE convention of weekly-windowed P0"
- 8-wave = "two months of wave cadence ≈ 2× SRE four-week window"

Alternative cadences (e.g., 2/4/8 doubling; 3/6/12 octave) would also be defensible. **Recommendation**: codify 3/5/8 with explicit operator-override-via-ledger-annotation provision. Pattern-only-criticism not bias-violation.

### §4.3 Codex-ecosystem-bias check

CLEAN. Dwell-threshold escalation is platform-neutral (SRE / ITIL / Kanban all org-distinct anchors); no OpenAI-flavored alternative. Independent parser for `claude doctor` (W326-D-5 AI-7 step 2) is defensive-engineering, not codex-ecosystem-specific.

### §4.4 Anti-rehash check

W326-D-5 §1 AI-7 already pre-staged this policy at high-level; W327-A-2 is the codification (specific external anchors, per-dim current-state mapping, SKILL.md insertion path). Not a rehash.

**Verdict**: PASS anti-bias inverse-test on all 4 axes.

---

## §5. SKILL.md insertion plan — REVISED per codex round-14 (Path B default)

### §5.1 Path decision — codex-r14 ratified Path B

Per codex round-14 ruling: "Prefer **Path B** for K-7: separate `.claude/skills/ops-rhythm/SKILL.md`, with a short sca-v11 cross-reference for the ship-gate penalty and ledger fields. Dwell escalation is operational cadence governance, not primarily candidate-evaluation rubric logic." (W327-A-4 §1 round-14 Q5)

| Path | Location | Status |
|---|---|---|
| (A) sca-v11 §11 inline | sota-convergence-audit/SKILL.md | **REJECTED per codex-r14** |
| **(B) Separate skill** | NEW `.claude/skills/ops-rhythm/SKILL.md` + compact sca-v11 cross-ref | **ADOPTED per codex-r14** |

**Rationale (codex-r14)**: dwell escalation is operational cadence governance (cross-cutting concern); sca-v11 is candidate-evaluation rubric (single-purpose). Co-location would inflate sca-skill size and conflate distinct discovery-trigger surfaces.

### §5.2 NEW skill `.claude/skills/ops-rhythm/SKILL.md` candidate text (PATH-B codex-r14 ratified)

```markdown
---
name: ops-rhythm
description: Use when ANY P0 carry-forward / SHIP-BLOCKER / "dwell" / "stuck work" / "escalation" / "operator-decision-block" surfaces in wave-N closure-synthesis. Fires on 3-wave / 5-wave / 8-wave dwell-threshold breaches; enforces ITIL/SRE-style escalation policy; required for sca-v11 ship-gate -0.5 composite-arch-quality penalty at 8-wave threshold.
---

# ops-rhythm (v1 — W327 K-7 codification, codex round-14 ratified Path B)

Operational cadence governance for P0 dwell threshold escalation. Sister skill to `sota-convergence-audit` (which evaluates candidates) and `goal-prompt-synthesis` (which authors /goal predicates). This skill enforces wave-cadence discipline when P0 SHIP-BLOCKER items persist beyond threshold.

## §1. Threshold ladder (3-wave / 5-wave / 8-wave)

Per W326 codex GPT-5.5 round-13 K-7 finding (MED, CODEX-FRESH): 7+ P0 SHIP-BLOCKER items have carried W316-S1 → W325 → W326-D across 8 waves without explicit dwell-escalation. sca-v11 codifies 3-tier threshold ladder with operator-bound vs AI-bound distinction.

### §1.1 Threshold ladder

| Dwell threshold | Required action | Enforcement |
|---|---|---|
| 3-wave | Next-wave closure MUST cite owner + ETA + next-irreversible-action | Audit-failure if uncited |
| 5-wave | Operator-decision-block at next wave START: ACCEPT-AS-RISK / REASSIGN / ACTION-NOW / DEFER-WITH-CAUSE; basic-memory note `W<wave>-DWELL-ESCALATION-<slug>`; W-wave docket entry. **Codex-r14 override discipline**: operator override permitted ONLY via explicit accepted-risk ledger disposition (`dwell_disposition: accept-risk` + signed annotation); **silent carry-forward beyond 5-wave threshold is policy violation** (wave-N closure-synthesis audit failure) | SessionStart-equivalent reminder; OPS-* items surfaced first |
| 8-wave | SHIP-BLOCKER promote: -0.5 install_score arch-itself penalty (sca-v11 §7 ship-gate amendment); BLOCK new T1 installs UNRELATED to dwell-P0; REQUIRE accepted-risk signing OR dedicated remediation-wave | sca-v11 §7 ship-gate floor amendment cross-reference |

### §1.2 AI-bound vs operator-bound class distinction

| Class | 3-wave | 5-wave | 8-wave |
|---|---|---|---|
| AI-bound | Next-wave SLA action OR explicit defer | Auto-redispatch in dedicated stream | BLOCK other work; remediation wave |
| Operator-bound | Mailbox notification; flag visible | Operator-decision-block at wave START + explicit ledger disposition (codex-r14 override discipline) | Promote SIGNED-ACCEPTED-RISK OR shipping-pause |

### §1.3 Ledger schema additions (sca-v11 + ops-rhythm shared)

```yaml
dwell_count: <int>  # consecutive waves this P0 has carried
dwell_class: ai-bound|operator-bound
dwell_first_wave: W<NNN>
dwell_threshold_state: below-3|3-wave|5-wave|8-wave
dwell_disposition: pending|accept-risk|reassign|action-now|defer-with-cause
dwell_disposition_signed: <string|null>  # T6 basic-memory note ID for accept-risk disposition (codex-r14 override discipline)
dwell_next_irreversible_action: <string|null>
dwell_eta: <YYYY-MM-DD|W<NNN>|null>
```

### §1.4 3-org-distinct external anchors (codex-r14 ratified)

- **Google SRE Error Budget Policy** — https://sre.google/workbook/error-budget-policy/ (Google LLC) — "halt all changes and releases other than P0 issues or security fixes until the service is back within its SLO" = direct analog of 8-wave threshold ship-block
- **Atlassian Kanban WIP Limits + Queue Aging** — https://www.atlassian.com/agile/kanban/wip-limits (Atlassian Inc.) — queue-aging escalation pattern; "items signaling problems—they might be blocked or more complex than expected" = direct analog of dwell-count metric
- **ITIL v4 Escalation Management** — https://wiki.en.it-processmaps.com/index.php/Incident_Management (Axelos Ltd. / PeopleCert; ITIL trademark holder) — functional+hierarchical escalation on dwell threshold breach; (codex-r14 ruling: DORA https://dora.dev/guides/dora-metrics/ counts as supporting-secondary under Google parent, NOT 3-org-distinct from K7-A)

### §1.5 Independent-parser wrap for `claude doctor` (codex K-7 paste-ready)

Until upstream `anthropics/claude-code` `claude doctor` EXIT-0-silent regression resolved (operator-bound 6-wave dwell), wrap doctor invocations with:

```bash
bash -c "claude doctor 2>&1 | tee tmp/doctor.log; if grep -q 'No issues found' tmp/doctor.log; then echo OK; else cat tmp/doctor.log; fi"
```

### §1.6 sca-v11 cross-reference (compact hook per codex-r14)

sca-v11 SKILL.md §7 (ship-gate floors) MUST contain the following 2-line cross-reference:

> 8-wave P0 dwell triggers -0.5 install_score arch-itself penalty per `.claude/skills/ops-rhythm/SKILL.md` §1.1. See ops-rhythm for full dwell policy, ledger schema, and 3-org-distinct anchors.
```

### §5.3 sca-v11 + new-ops-rhythm-skill Lineage rows (Path B per codex round-14/15)

```markdown
- **v11 W327** (sca SKILL.md) — K-7 codification cross-reference: 8-wave P0 dwell triggers -0.5 install_score arch-itself penalty per `.claude/skills/ops-rhythm/SKILL.md` §1.1 (Path B per codex round-14). sca-v11 ship-gate floor amendment for arch-itself only. Full dwell policy lives in ops-rhythm skill. Cite: W327-A-2-K7-DWELL-POLICY-SPEC.md.

- **ops-rhythm v1 W327** (NEW skill `.claude/skills/ops-rhythm/SKILL.md`) — P0 dwell-threshold escalation policy (3-wave / 5-wave / 8-wave); AI-bound vs operator-bound distinction; codex-r14 override discipline (silent carry-forward beyond 5-wave = policy violation); ledger schema additions (dwell_count, dwell_class, dwell_threshold_state, dwell_disposition, dwell_disposition_signed); 3-org-distinct anchors (Google SRE + Atlassian Kanban + ITIL v4 Axelos; DORA as supporting-secondary under Google parent per codex-r14); independent-parser wrap for `claude doctor` until upstream fix. Cite: W327-A-2-K7-DWELL-POLICY-SPEC.md + W327-A-4 codex round-14 + round-15 ratify trail.
```

---

## §6. Hold gate

**DO NOT edit SKILL.md until codex round-N PRE-APPROVE fires.** W327-A-4 will contain the codex round output. If codex BLOCKS: this doc stays DOC-ONLY (no SKILL.md insert); flag for operator W328+.
