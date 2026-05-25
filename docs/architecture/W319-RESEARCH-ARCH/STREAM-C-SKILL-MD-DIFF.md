# W319 Stream C — SKILL.md Diff (v8.1-partial absorption applied)

> **Wave**: W319 Stream C
> **Date**: 2026-05-19
> **Status**: APPLIED post codex round-2 APPROVE
> **Baseline**: SKILL.md @ 1587 LOC (v7.1 LIVE, HEAD `d8e9a02`)
> **Result**: SKILL.md @ **1629 LOC** (+42 LOC absorbed; under ~53 LOC estimate)
> **File**: `.claude/skills/sota-convergence-audit/SKILL.md`

## §1 — Summary of 7 surgical edits applied

| # | Section | LOC delta | Description |
|--:|---|--:|---|
| 1 | Header L6 version stamp | 0 | Updated from v7.1 to v8.1-partial with delta summary |
| 2 | After v7.1 preamble (~L22) | +1 line (big para) | Inserted v8.1-partial preamble blockquote with Δ42 + Δ45 spec |
| 3 | After D34 dim entry (~L340) | +5 lines | Inserted "Added in sca-v8.1-partial" preamble + D35 dim entry + Pre-composite D-EMP HARD GATE block |
| 4 | After path-(a) routing-only (~L360) | +18 lines | Inserted v8.1-partial dual composites block (path-b external + path-a override + arch-itself path-a-equivalent + downweight ladder) |
| 5 | Above T1 INSTALL entry (~L385) | +1 line | Inserted D-EMP PRE-COMPOSITE HARD GATE entry |
| 6 | After Pin-freshness anti-pattern (~L1014) | +1 line (big para) | Inserted "Paper-PASS smoke-FAIL silently shipped" anti-pattern entry |
| 7 | sca-v7.1 decay entry (~L925) | +1 line (big para) | Updated v7.1 entry + added sca-v8.1-partial entry as current rubric |

Net diff: SKILL.md 1587 → 1629 LOC (+42 LOC).

## §2 — Edit details (exact text replacements)

### Edit 1 — Header version stamp

```diff
- # sota-convergence-audit (v7.1 — W316 ships 9 deltas: Δ30-Δ38 absorbing W315-C/D ship-readiness + W315-B Stage-0 codification; 1 NEW dim D34 cohort_overlap_signal [inverted scale]; composite denom 28.0→**28.7 install / 12.6→12.9 pattern** under scored-dim path (b) — recommended; 28.0/12.6 retained under routing-only path (a) — operator override)
+ # sota-convergence-audit (v8.1-partial — W319 ships 2 deltas: Δ42 D-EMP RATIFY HARD GATE + Δ45 D35 D-CCRT cc_runtime_pathway_support; 4 deltas Δ40/Δ41/Δ43/Δ44 DEFERRED to W320+; arch-itself install_score 4.799/5 under W295 I9 self-reference extension to D-EMP; external composite denom 28.7→**30.7 install / 12.9→13.6 pattern** under path-(b) DEFAULT; codex round-2 W319-r2 APPROVE closure; v7.1 sub-version preserved as fallback via decision-decay ×0.95)
```

### Edit 2 — v8.1-partial preamble blockquote (after v7.1 preamble)

INSERTED new blockquote starting with `> **v8.1-partial changes (W319 — ship per W319-STREAM-C-V8-1-PARTIAL-SPEC.md + codex round-2 W319-r2 APPROVE closure...)** :`. Contains: (Δ42 D-EMP HARD GATE spec — scale, gate semantics, weights, 3-org anchors), (Δ45 D35 D-CCRT spec — scale, weights, anchors), W295 I9 self-reference extension, composite denom for external + arch, downweight ladder, 2 deltas DEFERRED to W320+, 10 v3 invariants preserved, codex round-1 REVISE + round-2 APPROVE summary, arch-itself install_score 4.799/5.

### Edit 3 — D35 dim entry + Pre-composite D-EMP HARD GATE block (after D34)

INSERTED:
- `> **Added in sca-v8.1-partial (W319 — ship per W319-STREAM-C-V8-1-PARTIAL-SPEC.md + codex round-2 W319-r2 APPROVE closure)**` preamble.
- `35. **D35 cc_runtime_pathway_support** *(v8.1-partial NEW — operator-mandated per W318-C-SCA-V8-1-DELTAS.md §1 Δ45)*` dim entry: W_install=1.0, W_pattern=0.2; soft-cap D35<2 caps at T3; 3-org-distinct anchors (Anthropic CC plugin docs + MCP spec + cardinal rule R2); 0-5 scale; W295 I9 treatment (arch IS Claude Code → D35=5 NOT skip-N/A); backward-compat note.
- `**Pre-composite HARD GATE — D-EMP empirical_viability**` block: pre-composite-NOT-tiebreaker; 0-5 scale (untested → soak-tested); gate semantics (D-EMP=0 HARD BLOCK; D-EMP=1 SOFT WARN T2-CHERRY ceiling; D-EMP ≥2 no special handling); W295 I9 extension (arch skip-N/A); 3-org-distinct anchors (NIST AI 600-1 MEASURE-2.3 + OpenSSF Brittle Tests + W316-A canonical); W316-A worked example (codex round-1 F1 MEDIUM-resolved per Option A: D-EMP=2 has NO special handling; NSSM HOLD via OPERATOR-AI OVERRIDE not D-EMP ceiling).

### Edit 4 — Dual composites v8.1-partial block (after path-(a) routing-only)

INSERTED new block between "Path (a) routing-only" and "Dual composites — sca-v7 (W314)":
- Path-conditional preamble (W319 codex-r2 APPROVE): external candidates use path-(b)-equivalent; arch-itself uses path-(a)-equivalent under W295 I9 extension (BOTH D-EMP + D34 skip-N/A; D35 NOT skip-N/A).
- Path-(b) external candidates: denom 30.7/13.6; D-EMP HARD GATE fires first.
- Path-(a) operator-override external candidates: denom 30.0/13.3.
- Arch-itself path-(a)-equivalent: denom 27.4/11.3 (D-EMP + D34 skip-N/A; D35 scored).
- Downweight ladder: v7.1 ×0.95 → v8.1-partial; T1/T2 without D-EMP evidence ×0.85 stricter.

### Edit 5 — Routing thresholds (D-EMP HARD GATE entry above T1 INSTALL)

INSERTED above `- **T1 INSTALL**:`:
```
- **D-EMP PRE-COMPOSITE HARD GATE** *(v8.1-partial NEW — Δ42 W319)*: fires BEFORE the weighted-sum aggregation. **D-EMP=0 → AUTO-BLOCK** from T1/T1-PROVISIONAL/T2 verdicts (demoted to T3-PATTERN-STUDY-or-lower). **D-EMP=1 → SOFT WARN** (T2-CHERRY ceiling; T1 requires operator-explicit-override + W-wave docket entry). **D-EMP ≥2 → no special handling** (normal weighted-sum applies). Skip-N/A for arch-itself per W295 I9 self-reference invariant extension. Anti-pattern: T1 INSTALL on a paper-PASS install_score WITHOUT D-EMP ≥2 smoke-evidence (closes W316-A NSSM-SWITCH paper-PASS smoke-FAIL class).
```

### Edit 6 — Anti-pattern "Paper-PASS smoke-FAIL silently shipped" entry

INSERTED after Pin-freshness anti-pattern:
```
- **Paper-PASS smoke-FAIL silently shipped** (v8.1-partial, W319 — Δ42 D-EMP HARD GATE) — T1 INSTALL where install_score ≥ 4.0 AND `D-EMP < 2` ... [Canonical case: W316-A NSSM-SWITCH HOLD-NSSM ... Three out-of-rubric blockers ... Verdicts that shipped without D-EMP scoring MUST be re-litigated at retroactive ×0.85 downweight per v7.1→v8.1-partial mandatory empirical-evidence flag.]
```

### Edit 7 — Decision-decay state machine (sca-v7.1 + sca-v8.1-partial entries)

UPDATED:
- sca-v7.1 entry: from "full weight 1.0 — **current rubric**" to "auto-downweighted **×0.95** when sca-v8.1-partial is active; stricter ×0.85 for T1/T2 without D-EMP evidence under v8.1-partial mandatory empirical-evidence retroactive flag".
- INSERTED new entry for sca-v8.1-partial as current rubric with arch-itself install_score 4.799/5 + pattern_score 4.20/5 PASS-by-design.
- UPDATED "When the rubric advances to sca-v8+ in a future wave..." to "sca-v8.2+ in a future wave...".

## §3 — Verification — invariants check post-edit

| Invariant | Status |
|---|---|
| Cardinal-rule R1 (trusted-source pattern) | ✓ HOLDS — D-EMP + D35 both have 3-org-distinct anchors (NIST + OpenSSF + W316-A canonical; Anthropic + MCP spec + R2) |
| Cardinal-rule R2 (hooks-direct-CLI) | ✓ HOLDS — no hook changes |
| Cardinal-rule R3 (installed-upstream-subagents) | ✓ HOLDS — no subagent changes |
| Cardinal-rule R4 (SKILL.md path-gated; NO `.claude/rules/`) | ✓ HOLDS — edit is to SKILL.md only |
| Cardinal-rule R5 (permissions-not-guards) | ✓ HOLDS — no settings.json changes |
| CLAUDE.md ≤50 LOC body | ✓ HOLDS — no CLAUDE.md changes |
| settings.json ≤15,360 bytes | ✓ HOLDS — no settings.json changes |
| 10 v3 design invariants | ✓ ALL PRESERVED — D-EMP is dim-EXTERNAL above-composite gate (additive); D35 is soft-cap dim (additive); 7-tier ladder unchanged; dual composites preserved; decision-decay extended; T6 ledger preserved |
| `self_invented_count: 0` | ✓ HOLDS — operator-curated SKILL.md edit, no new project-owned rules |
| `rule_version=sca-v8.1-partial` is current | ✓ UPDATED in header L6 + decay ladder + composite math |

## §4 — Audit-trail cite-anchors

| Cite | Source | Purpose |
|---|---|---|
| W319-STREAM-C-V8-1-PARTIAL-SPEC.md | paste-ready spec | Source of all 7 edits |
| W317-A-SCA-V8-D-EMP-DRAFT.md | W317 Stream-A | Original Δ42 D-EMP DRAFT (ratified at W319) |
| W318-C-SCA-V8-1-DELTAS.md | W318 Stream-C | Original Δ45 D-CCRT proposal (renamed D35; W_install=1.0 lift selected) |
| W316-B-ARCH-SELF-EVAL-V7-1-SHIPPED.md | W316 Stream-B | path-(a) canonical method (W295 I9 self-reference) |
| W295-codex-r12 + W295 invariant I9 | W295 | Self-reference invariant (D34 skip-N/A; W319 extended to D-EMP) |
| codex round-1 thread `019e410b-691f-7331-8395-c4cf8f342210` | tmp/W319-stream-c-codex-r1-output.txt | REVISE F1 MEDIUM finding (D-EMP=2 threshold inconsistency) |
| codex round-2 thread `019e410e-4dbc-7c71-a4dc-05f5d2639320` | tmp/W319-stream-c-codex-r2-output.txt | APPROVE final ratification |

## §5 — Verdict

**SHIP-v8.1-PARTIAL APPLIED to SKILL.md at W319** post codex round-2 APPROVE. **42 LOC** absorbed inline (under 53 LOC estimate). All cardinal-rule + invariant checks PASS. Rubric `rule_version` advances v7.1 → v8.1-partial with arch-itself install_score 4.799/5 path-(a)-equivalent under W295 I9 self-reference extension.

**Reversibility**: HIGH — single SKILL.md edit; revert via `git revert HEAD` rolls back to v7.1 LIVE state at `d8e9a02`. No external dependency changes.
