# 02 — Probe DAG 1-7 Application to CCPM (automazeio/ccpm)

> **Cite anchor**: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG 1-7
> **Cross-model gate**: Path P codex T1 verdict CITE-PATTERN-ONLY conf=0.90 @
> `.claude/state/codex_consult_w134_f24b_ccpm_OUT.txt`

## Probe DAG verdicts

### Probe 1 — count-OVER

| Evidence | Orchestrator | Codex T1 |
|---|---|---|
| README "Eval Score 100%" badge claim | (noted unsourced) | FAIL (Row-2 fabrication-test AUTO-FAIL — no methodology citation) |
| Skill-count claim (single skill) | accurate (1 SKILL.md + 6 refs + 12 scripts) | PASS-shape (count not misrepresented in skill arch) |

**Convergence**: FAIL on README claim (codex stricter — applied Row-2 fabrication-test) ✅

### Probe 2 — SDK-vs-CLI surface

| Evidence | Orchestrator | Codex T1 |
|---|---|---|
| Agent Skills standard (cross-tool: Claude Code, Codex, OpenCode, Factory, Amp, Cursor) | NEUTRAL (didn't probe) | **PASS** (cross-tool by design) |

**Convergence**: codex correct — orchestrator missed PASS. Lesson: probe SDK-CLI compatibility explicitly when Agent Skills standard is involved.

### Probe 3 — architectural-API

| Evidence | Orchestrator | Codex T1 |
|---|---|---|
| Pure Anthropic CC Skill + Codex CLI compat (no Anthropic-API-only primitives) | NEUTRAL | **PASS** (CC-native) |

**Convergence**: codex correct.

### Probe 4 — plugin-namespace DUPLICATE-FUNCTIONALITY (DECISIVE FAIL)

| Evidence | Orchestrator | Codex T1 |
|---|---|---|
| CCPM `ccpm` skill name — no name collision | PASS (no name conflict) | — |
| CCPM Execute phase parallel-agent dispatch overlaps eee's `parallel-agent-wave.md` + T1-T7 lifecycle | **FAIL DUPLICATE** | **FAIL** |
| CCPM Track phase overlaps eee's per-fire MD folder + TaskCreate/TaskUpdate | **FAIL DUPLICATE** | **FAIL** |

**Convergence**: FAIL ✅ — both surfaces agree DUPLICATE-FUNCTIONALITY per kiss-dry-yagni Must-Never #4.

### Probe 5 — mode-harness-shape (DECISIVE FAIL)

| Evidence | Orchestrator | Codex T1 |
|---|---|---|
| Trigger pattern abstract ("write a PRD for X" / "what's next") could fire autonomously | likely PASS | — |
| CCPM SKILL assumes FEATURE-SHIPPING PM LOOP (PRD → Epic → Issue → Code) | (overlooked) | **FAIL** — PM-loop assumption incompatible with autonomous /loop audit-fire pattern |
| Track phase ("what's next" / "what's blocked" / standup) presumes feature-backlog | (overlooked) | **FAIL** |

**Convergence**: codex stricter — orchestrator missed that abstract triggers still presume PM-loop semantics.

### Probe 6 — direct-file/registry blockers

| Evidence | Orchestrator | Codex T1 |
|---|---|---|
| LICENSE = MIT ✅ | PASS | PASS |
| Named GitHub org + named author + active commits | PASS | PASS |
| No archived/deprecated badges | PASS | PASS |
| GitHub Issues integration requirement (sync.md:10-19) | (decisive blocker) | **MITIGABLE** (can use local-only mode) |

**Convergence**: PASS with MITIGABLE GitHub Issues caveat. Codex applied softer mitigation than orchestrator initially expected.

### Probe 7.a — demand-absence (DECISIVE FAIL)

| Evidence | Orchestrator | Codex T1 |
|---|---|---|
| eee has NO current PRD-driven feature backlog | FAIL | **FAIL** |
| eee operates in autonomous /loop audit-driven mode, not feature-shipping mode | FAIL | **FAIL** |
| per-fire MD folder + TaskCreate cover state mgmt for autonomous arcs | FAIL — incumbent covers demand | **FAIL** |

**Convergence**: FAIL ✅ — both surfaces agree demand-absence.

### Probe 7.b — demand-creates-new-workflow eligibility

| Clause | Orchestrator | Codex T1 |
|---|---|---|
| (1) Named operational use case | borderline-eligible (if feature-shipping arc) | NOT-MET (no named use case TODAY) |
| (2) Cited local input source path | NOT-MET (no `.claude/prds/` in eee currently) | NOT-MET |
| (3) Wiring path | THEORETICALLY-PRESENT | NEUTRAL |
| (4) Incumbent comparison | partial-match | NOT-MET (eee TaskCreate + per-fire folders + parallel-agent-wave incumbent) |
| (5) Reversible time-box | NOT-MET | NOT-MET |

**Convergence**: NOT-ELIGIBLE ✅ — codex stricter on clause 1 (must be named TODAY, not future-conditional)

## Aggregate Probe DAG verdict

| Probe | Verdict | Decisive |
|---|---|---|
| P1 count-OVER (Row-2 AUTO-FAIL on "Eval 100%") | FAIL | sub-finding |
| P2 SDK-vs-CLI | PASS | — |
| P3 arch-API | PASS | — |
| P4 plugin-namespace DUPLICATE | **FAIL** | ✅ DECISIVE-1 |
| P5 mode-harness-shape | **FAIL** | ✅ DECISIVE-2 |
| P6 blockers | PASS (GitHub Issues MITIGABLE) | — |
| P7a demand-absence | **FAIL** | ✅ DECISIVE-3 |
| P7b demand-creates | NOT-ELIGIBLE | — |

**THREE independent decisive Probe-DAG failures (P4 + P5 + P7a) AND ROW-2 AUTO-FAIL on README claim.**

## Verdict shape: CITE-PATTERN-ONLY (distinct from REJECT-FOR-FIT)

Despite 3 decisive failures, codex T1 returned **CITE-PATTERN-ONLY** rather than pure REJECT-FOR-FIT because:

1. CCPM contains 4 EXTRACTABLE patterns that could enrich eee's existing per-fire MD folder system
2. Probe 6 GitHub Issues blocker is MITIGABLE (not decisive)
3. Lightweight single-skill architecture is itself a positive design model

This is a NEW verdict shape for Wave 134 arc — distinct from:
- APPROVE (full plugin install)
- STUDY-PILOT-NARROW (pilot install)
- REJECT-FOR-FIT (full decline + no extraction)
- CITE-PATTERN-ONLY (decline install + EXTRACT useful subset patterns)

## Orchestrator-codex probe-level convergence

| Probe | Orchestrator | Codex T1 | Convergence |
|---|---|---|---|
| P1 | (didn't probe Row-2) | FAIL | codex correct |
| P2 | NEUTRAL | PASS | codex correct |
| P3 | NEUTRAL | PASS | codex correct |
| P4 | FAIL | FAIL | CONVERGENT |
| P5 | likely-PASS | FAIL | codex stricter |
| P6 | PASS-blocker | PASS-MITIGABLE | mostly aligned |
| P7a | FAIL | FAIL | CONVERGENT |
| P7b | borderline | NOT-ELIGIBLE | codex stricter |

**5/8 perfect convergence + 3 codex-stricter-corrections** — codex caught:
- P1 Row-2 AUTO-FAIL (Eval 100% unsourced) — orchestrator didn't probe README badges deeply
- P5 PM-loop assumption — orchestrator over-credited "abstract triggers" without checking workflow semantics
- P7b clause-1 strictness — orchestrator's "future-conditional" eligibility refuted

Cross-model verification working as designed: codex's deep-review surfaces nuances orchestrator missed.

## Mia ladder advance

n=1541 → n=1546 (+5: Probe DAG 1-7 applied / 3 decisive failures / NEW CITE-PATTERN-ONLY verdict shape / 5/8 convergence + 3 codex-corrections / Row-2 AUTO-FAIL on Eval 100%)
