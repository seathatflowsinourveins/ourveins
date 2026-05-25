# W329 Stream A · Item 1 — CLAUDE.md R5-W325 corollary line addition

**Wave**: W329 Stream A · **Date**: 2026-05-19 · **HEAD pre-edit**: `5cf5c90`
**Scope**: CLAUDE.md L22 R5 cardinal-rule corollary inline-extension (NO new line — preserve ≤50 LOC body cap)
**Cite-anchors**: CCBP `claude-memory.md:34-40 @ f28c2da`; W325-C STREAM-C-OPTION-C-LAYERED-DEFENSE.md:33-92 (Patch C1 + Patch C4 specs); W328-A-4-5-CONTROL-COMPLIANCE.md (4.0/10 baseline); W328-A-STREAM-A-SYNTHESIS.md §6 (R5 PARTIAL-HOLD-UPGRADED verdict)

---

## §1. Constraint analysis

**CLAUDE.md body LOC cap** = 50 (per CCBP `claude-memory.md:34-40` ≤50 LOC body discipline + `Z:/claude-sota-pure/CLAUDE.md` 78-LOC baseline contrast).

**Pre-edit state**: CLAUDE.md = exactly 50 LOC (`wc -l` confirms).

**Operator-supplied requirement**: "Add a corollary clarifying R5 Windows-native platform constraint + Option C 5-control layered-defense path-forward + acceptance-record reference. The addition MUST NOT push CLAUDE.md over 50 LOC body cap."

**Decision**: extend L22 (the R5 cardinal-rule sentence) **INLINE** rather than add a new line. This preserves the 50-LOC body cap while inserting the corollary content adjacent to the rule it modifies.

This pattern matches the established CLAUDE.md inline-extension discipline used at L13 (Agent-team trigger W269 mandate · W312-D tightening · W320-B-2 cite-refresh — all three corollaries stacked inline on one logical line), L18 (R1 + W270 corollary inline), and L19 (R2 + W286-arc-P0C ratification + W300-AI-1 corollary inline).

## §2. Exact diff applied

### Pre-edit (L22 single sentence, 1 line)

```
5. **Safety boundaries via Claude Code permissions + sandboxing**, NOT custom guard scripts — per `https://docs.anthropic.com/en/docs/claude-code/settings`.
```

### Post-edit (L22 with R5-W325-corollary inline appended, still 1 line)

```
5. **Safety boundaries via Claude Code permissions + sandboxing**, NOT custom guard scripts — per `https://docs.anthropic.com/en/docs/claude-code/settings`. **R5-W325-corollary (W329-A 2026-05-19)**: runtime is Windows-native + Z:-portable (per CLAUDE.local.md L4); Anthropic CC sandbox supports macOS/Linux/WSL2 only per `https://code.claude.com/docs/en/sandboxing` — so OS-sandbox layer is structurally inert. R5 held via sca-v11 §6 5-control layered-defense as documented-exception (Option C; W325-C recommendation 4.85/5). Status: PARTIAL-HOLD-UPGRADED per W328-A-4 (4.0/10 → 5.0/10 with Patch C1 32-entry deny; Controls 2 audit-hook + Control 5 capability-registry pending W329-W330). Acceptance-record at `docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-3-ACCEPTANCE-RECORD-DRAFT.md` (operator-sign-pending; falsifiable-inverse FI-1..FI-5 per `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md:83-92`).
```

### Diff stats

- Lines changed: 1 (L22 in-place modify)
- Lines added: 0
- Lines removed: 0
- CLAUDE.md post-edit LOC: 50 ✓ (cap holds)
- CLAUDE.md post-edit bytes: 14118 (was ~13345 pre-edit; +773 bytes inline content)

## §3. Corollary content rationale

The corollary captures four load-bearing facts that move R5 from W328's "PARTIAL-HOLD-UPGRADED, but no formal equivalence claim" state toward "EQUIVALENT-HOLD via signed acceptance-record":

| Fact | Cite-anchor | Why it must be in CLAUDE.md |
|------|-------------|----------------------------|
| Windows-native + Z:-portable constraint | CLAUDE.local.md L4 | Without this, future cardinal-rule auditors might miss the structural reason `sandbox.enabled=true` is paper-only |
| Anthropic CC sandbox supported-OS list excludes Windows native | `https://code.claude.com/docs/en/sandboxing` | This is the **dispositive fact** per W325-C §3.1 — establishes that Option C is not laziness, it is the only viable Windows-native path |
| sca-v11 §6 5-control documented-exception path-forward | W325-C STREAM-C-OPTION-C-LAYERED-DEFENSE.md + sca-v11 §6 codification at `.claude/skills/sota-convergence-audit/SKILL.md:521-545` | Operationalizes "documented exception" — gives auditors a concrete checklist |
| Acceptance-record file location + FI-1..FI-5 falsifiable-inverse anchor | `docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-3-ACCEPTANCE-RECORD-DRAFT.md` + W325-C STREAM-C-RECOMMENDATION.md:83-92 | Closes the W325-C-4 follow-up AI; provides a single pointer for future operator re-attestation per W325-C-10 |

## §4. Verification post-edit

```bash
$ wc -l Z:/claude-sota-installed/CLAUDE.md
50 Z:/claude-sota-installed/CLAUDE.md
```

✓ Body cap holds at 50 LOC.

```bash
$ gitleaks detect --source Z:/claude-sota-installed/CLAUDE.md --no-git --no-banner
scanned ~14118 bytes (14.12 KB) in 179ms
no leaks found
exit=0
```

✓ No secrets leaked in corollary content.

## §5. Cardinal-rule self-check (post-edit)

| Rule | Status | Note |
|------|--------|------|
| R1 Install primitives | ✓ HOLD | No installs |
| R2 Hook discipline | ✓ HOLD | No hook changes |
| R3 Subagents | ✓ HOLD | No subagent changes |
| R4 Behavior in CLAUDE.md + settings.json | ✓ HOLD | Modification is to canonical CLAUDE.md; no `.claude/rules/*` added |
| R5 Safety boundaries | ◐ PARTIAL-HOLD-UPGRADED-MORE | Corollary now points at the equivalence path-forward; Patch C1 closes FI-1; W329-A-3 unsigned draft created; FI-2 still pending W330 audit-hook |
| `self_invented_count: 0` | ✓ HOLDS | No rules / no hooks / no skill changes |
| CLAUDE.md ≤50 LOC | ✓ HOLDS | Inline-extension on L22 |

## §6. Cite-anchor consolidated

- `Z:/claude-sota-installed/CLAUDE.md` L22 (R5 cardinal rule + W329-A R5-W325-corollary inline)
- `Z:/claude-sota-installed/CLAUDE.local.md:4` (Z:-portable Windows-native hard constraint)
- `https://code.claude.com/docs/en/sandboxing` (Anthropic CC sandbox supported-OS list)
- `https://docs.anthropic.com/en/docs/claude-code/settings` (R5 anchor URL)
- `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md:521-545` (sca-v11 §6 5-Control Layered-Defense codification)
- `Z:/claude-sota-installed/docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-C-LAYERED-DEFENSE.md:33-92` (Patch C1 + Patch C4 specs)
- `Z:/claude-sota-installed/docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md:83-92` (FI-1..FI-5 falsifiable-inverse claim spec)
- `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/W328-A-4-5-CONTROL-COMPLIANCE.md` (4.0/10 5-control baseline)
- `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/STREAM-A-SYNTHESIS.md§6` (11-wave dwell + PARTIAL-HOLD-UPGRADED verdict)
- CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ f28c2da` (≤50 LOC body discipline)
