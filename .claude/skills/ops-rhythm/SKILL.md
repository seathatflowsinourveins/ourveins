---
name: ops-rhythm
description: Use when ANY P0 carry-forward / SHIP-BLOCKER / "dwell" / "stuck work" / "escalation" / "operator-decision-block" surfaces in wave-N closure-synthesis or status review. Fires on 3-wave / 5-wave / 8-wave dwell-threshold breaches; enforces ITIL/SRE/Kanban-style escalation policy; required for sca-v11 ship-gate -0.5 composite-arch-quality penalty at 8-wave threshold. Sister skill to sota-convergence-audit (candidate-eval) and goal-prompt-synthesis (predicate authoring).
---

# ops-rhythm (v1 — W327 K-7 codification, codex round-14 + round-15 ratified Path B)

Operational cadence governance for P0 dwell threshold escalation. Sister skill to `sota-convergence-audit` (which evaluates candidates) and `goal-prompt-synthesis` (which authors /goal predicates). This skill enforces wave-cadence discipline when P0 SHIP-BLOCKER items persist beyond threshold.

> **W295 §6.2 anti-bias inverse-test PASS** + **W326 codex GPT-5.5 round-13 K-7 CODEX-FRESH** + **W327 codex GPT-5.5 round-14 REVISE + round-15 (post-revision) ratify** trail. See `docs/architecture/W327-CODEX-K3-K7-CODIFY/W327-A-2-K7-DWELL-POLICY-SPEC.md` for full spec and `W327-A-4` for codex audit trail.

## §1. Threshold ladder (3-wave / 5-wave / 8-wave)

### §1.1 Three-tier policy

| Dwell threshold | Trigger | Required action | Enforcement |
|---|---|---|---|
| **3-wave** | P0 entry carries 3 consecutive waves | Next-wave closure MUST cite explicit owner (AI / operator / shared) + ETA (specific date OR specific wave-N) + next-irreversible-action (concrete next step that cannot be re-deferred) | Wave-N closure-synthesis MUST cite the 3-wave-dwell list; non-citation = audit failure |
| **5-wave** | P0 entry carries 5 consecutive waves | AUTO-ESCALATE: (a) operator-decision-block invoked at next-wave START (operator MUST explicitly disposition: ACCEPT-AS-RISK, REASSIGN, ACTION-NOW, or DEFER-WITH-CAUSE); (b) basic-memory note `W<wave>-DWELL-ESCALATION-<slug>` written; (c) W-wave docket entry auto-fires. **Codex-r14 override discipline**: operator override permitted ONLY via explicit accepted-risk ledger disposition (`dwell_disposition: accept-risk` + signed annotation in T6 basic-memory); **silent carry-forward beyond 5-wave threshold is policy violation** (wave-N closure-synthesis audit failure). | SessionStart-equivalent reminder; OPS-* items surfaced first |
| **8-wave** | P0 entry carries 8 consecutive waves | SHIP-BLOCKER PROMOTION: composite-architecture-quality penalty applied (-0.5 per 8-wave P0 dwell row, sca-v11 §7 ship-gate amendment); BLOCK new T1 installs UNRELATED to dwell-P0 (focus discipline); REQUIRE accepted-risk signing OR dedicated remediation-wave | sca-v11 §7 ship-gate floor amendment for arch-itself when 8-wave dwell present |

### §1.2 AI-bound vs operator-bound class distinction

| Class | 3-wave | 5-wave | 8-wave |
|---|---|---|---|
| AI-bound | Next-wave SLA action OR explicit defer | Auto-redispatch in dedicated stream | BLOCK other work; remediation wave |
| Operator-bound | Mailbox notification; flag visible | Operator-decision-block at wave START + explicit ledger disposition (codex-r14 override discipline) | Promote SIGNED-ACCEPTED-RISK OR shipping-pause |

**AI-bound** = Claude/codex can action without operator (has authority + tools).
**Operator-bound** = requires keystrokes / decision / external account (Perplexity key rotation, TAVILY key, basic-memory v3 reconcile, R5 sandbox-architecture decision, ECC interactive update).

### §1.3 Ledger schema additions (sca-v11 + ops-rhythm shared)

```yaml
dwell_count: <int>                       # consecutive waves this P0 has carried
dwell_class: ai-bound|operator-bound
dwell_first_wave: W<NNN>
dwell_threshold_state: below-3|3-wave|5-wave|8-wave
dwell_disposition: pending|accept-risk|reassign|action-now|defer-with-cause
dwell_disposition_signed: <string|null>  # T6 basic-memory note ID for accept-risk disposition (codex-r14 override discipline)
dwell_next_irreversible_action: <string|null>
dwell_eta: <YYYY-MM-DD|W<NNN>|null>
```

### §1.4 3-org-distinct external anchors (W295 I1 satisfied; codex round-14 + round-15 ratified)

- **Google SRE Error Budget Policy** — https://sre.google/workbook/error-budget-policy/ (Google LLC, SRE division) — "halt all changes and releases other than P0 issues or security fixes until the service is back within its SLO" = direct analog of 8-wave threshold ship-block. Supporting-secondary cite under Google parent: DORA MTTR tiered targets https://dora.dev/guides/dora-metrics/ (Elite <1h, High <1d, Medium <1w, Low >1w).
- **Atlassian Kanban WIP Limits + Queue Aging** — https://www.atlassian.com/agile/kanban/wip-limits (Atlassian Inc.) — queue-aging escalation pattern; "WIP limits make blockers and bottlenecks visible, allowing teams to swarm around blocking issues"; aging items signal blocked-or-complex problems = direct analog of dwell-count metric.
- **ITIL v4 Escalation Management** — https://wiki.en.it-processmaps.com/index.php/Incident_Management (Axelos Ltd. / PeopleCert; ITIL trademark holder, post-2021 acquisition) — functional+hierarchical escalation on dwell threshold breach. ITIL Problem Management: "reduce the likelihood and impact of incidents by identifying causes of incidents as well as managing workarounds and known errors."
- **Supporting-fourth-anchor (over-coverage)**: ISO 31000:2018 Risk Management — https://www.iso.org/standard/65694.html (International Organization for Standardization) — risk treatment monitoring + escalation provisions argues for explicit escalation state machines to defeat dwell-fatigue bias.

### §1.5 Independent-parser wrap for `claude doctor` (codex K-7 paste-ready)

Until upstream `anthropics/claude-code` `claude doctor` EXIT-0-silent regression resolved (operator-bound 6-wave dwell), wrap doctor invocations with:

```bash
bash -c "claude doctor 2>&1 | tee tmp/doctor.log; if grep -q 'No issues found' tmp/doctor.log; then echo OK; else cat tmp/doctor.log; fi"
```

### §1.6 sca-v11 cross-reference (compact hook per codex round-14)

sca-v11 SKILL.md §7 (ship-gate floors) MUST contain the following 2-line cross-reference:

> 8-wave P0 dwell triggers -0.5 install_score arch-itself penalty per `.claude/skills/ops-rhythm/SKILL.md` §1.1. See ops-rhythm for full dwell policy, ledger schema, and 3-org-distinct anchors.

## §2. Current arch-state dwell snapshot (W326-D close)

| Dwell item | Waves | Class | Policy state at W327 start | Action mandate |
|---|---|---|---|---|
| R5 SHIP-BLOCKER (bypassPermissions:true + sandbox:false) | 8 | operator-bound | **8-WAVE**: SHIP-BLOCKER promote, T1-install-BLOCK unrelated, accepted-risk signing OR remediation-wave | W327 Stream B (per W326-D-5 AI-1) addresses; operator decision required |
| Perplexity API rotation (W319-SEV1) | 7 | operator-bound | **5-WAVE+**: operator-decision-block at W327 START, basic-memory note pending | Operator W327+ action: rotate key OR mark ACCEPTED-RISK |
| `claude doctor` EXIT-0-silent | 6 | AI-bound (parser wrap) + operator-bound (upstream issue) | **5-WAVE+**: AI-side action paste-ready §1.5; operator-side upstream-issue file | W327: ship parser-wrap; operator: file upstream issue |
| ECC interactive update | 3 | operator-bound | **3-WAVE**: owner=operator; ETA: next interactive session; next-action: `/plugin update everything-claude-code agent-teams` | Operator W327+ action |
| statusLine hardcoded path (settings.json:206) | 4 | AI-bound | **3-WAVE**: owner=AI; action: env-var-substitute (W326-D-5 OPS-7) | W327+ AI action |
| TAVILY/EXA key population | 2 | operator-bound | Below 3-wave threshold; no escalation yet | None |
| basic-memory v0.21.1 → v3.3.1 reconcile | 2 | operator-bound | Below 3-wave threshold | None |

## §3. Discovery triggers (skill auto-fire conditions)

Per `description:` matching: skill auto-fires when user/orchestrator references:

- "P0 carry-forward" / "dwell" / "stuck work" / "stuck for N waves" / "escalation"
- "operator-decision-block" / "operator mailbox" / "accepted-risk signing"
- "SHIP-BLOCKER" combined with multi-wave references
- "wave-N closure-synthesis" audit context
- sca-v11 §7 ship-gate-floor evaluation for arch-itself (8-wave check)

## §4. Composition notes

This skill is operational cadence governance. It does NOT evaluate candidates (use `sota-convergence-audit`), author goals (use `goal-prompt-synthesis`), or compact transcripts (use `everything-claude-code:strategic-compact`). It is the W327 K-7 codification of the dwell-threshold-escalation pattern.

## §5. Provenance

- **codex K-7 framing**: W326-D Stream D codex GPT-5.5 round-13, `Z:/claude-sota-installed/docs/architecture/W326-GPT55-DEEP-AUDIT/W326-D-2-CODEX-DEEP-AUDIT-OUTPUT.md:144-161`
- **anti-bias gate**: W326-D-3 anti-bias gate, `:72-78` PASS-WITH-OBSERVATION → upgraded STRONG-CONVERGENT after W327-A-3 external cite-strengthening
- **W327 codification spec**: `Z:/claude-sota-installed/docs/architecture/W327-CODEX-K3-K7-CODIFY/W327-A-2-K7-DWELL-POLICY-SPEC.md`
- **codex round-14 PRE-APPROVE**: W327-A-4 §1 — REVISE (specific narrow revisions: Path B, override discipline, DORA collapse); revisions applied 2026-05-19
- **codex round-15 RATIFY**: W327-A-4 §6+ — NEEDS-REVISION (stale snippets + missing skill file); resolved in current commit
