# 01 — OpenSpec Fire 13 correction synthesis (forward-only Pattern A apply)

> **Purpose**: synthesize the Fire 16 GPT-5.5 cross-model verdict on Fire 13 OpenSpec claims.
> Forward-only per `port-note-discipline.md §6` (no historical rewrite).

## Source verdicts (Fire 16 GPT-5.5 conf=0.94)

1. **Claim 1 (AGENTS.md EMPTY)**: ✅ VERIFIED-EMPTY — Fire 13 anatomy correct
2. **Claim 2 (WORKSPACE_REIMPLEMENTATION ACTIVE)**: ✅ VERIFIED-ACTIVE — Fire 13 anatomy correct
3. **Claim 3 (Cross-tool integration UNKNOWN)**: ❌ REFUTED — OpenSpec actually documents **29 supported tools** (Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, Kiro, ForgeCode, Windsurf + 21 more)

## Authoritative consolidated revision (3 specific corrections to Fire 13 OpenSpec anatomy)

### Correction 1: Cross-tool integration

**Fire 13 file 01 claim** (L66, L48): "Agent integrations: UNKNOWN (no AGENTS.md spec)" + "Skills mode: UNKNOWN"

**Authoritative replacement**: **OpenSpec documents 29 SUPPORTED TOOLS** at `docs/supported-tools.md:25-53`. README at `:102` claims "25+ tools and growing" and at `:132` says "works with 20+ AI assistants via slash commands". This is MORE cross-tool integration than Fire 13 attributed to OpenSpec.

**Operational implication**: OpenSpec is NOT cross-tool-blind; the AGENTS.md emptiness is a DIFFERENT axis than cross-tool integration. AGENTS.md represents the **single-file cross-tool integration spec format** (Anthropic-canonical), while OpenSpec uses its OWN cross-tool integration model documented via `docs/supported-tools.md` + skills/commands files for each tool.

### Correction 2: AGENTS.md emptiness — verdict context

**Fire 13 file 01 claim** (L78): "Empty AGENTS.md = no documented cross-tool integration architecture"

**Authoritative replacement**: AGENTS.md is empty (VERIFIED), but OpenSpec has DIFFERENT cross-tool integration architecture (via `docs/supported-tools.md` + per-tool skills). The "no documented cross-tool integration architecture" claim is FALSE — OpenSpec has its own architecture, just NOT in AGENTS.md format. spec-kit's 392-LOC AGENTS.md is one model; OpenSpec's 29-tool docs/supported-tools.md is another model.

### Correction 3: Revised SRA D7+D8+D10 scores

**Fire 13 file 01 SRA verdict**:

| Dim | Fire 13 framing | GPT-5.5 corrected |
|---|---|---|
| D7 Anthropic-aligned | UNKNOWN (no Agent Skills standard mention) | **PARTIAL** (29 tools incl. Claude Code support documented at `docs/supported-tools.md:25-53`; AGENTS.md format NOT used but Claude Code IS supported via slash commands) |
| D8 industry adoption | PARTIAL (no named-practitioner cites) | UNCHANGED (no new named-practitioner evidence; 46k★ velocity still ambiguous) |
| D10 replacement viability vs spec-kit | UNCERTAIN | **WEAKER-BUT-NOT-DISQUALIFIED** (still less mature than spec-kit on AGENTS.md depth + workspace stability; but cross-tool reach is comparable or richer) |

SRA score moves from **5/10 PASS + 4 PARTIAL/UNKNOWN + 1 UNCERTAIN** to **5/10 PASS + 4 PARTIAL + 1 UNCERTAIN** (D7 upgrade UNKNOWN → PARTIAL).

## Pattern A fix-forward (forward-only)

Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` + `port-note-discipline.md §6`:

- Fire 13 file 01 STAYS as committed at `c57d807` (historical record)
- Corrections documented HERE forward-only
- Future OpenSpec disposition references Fire 16 (this folder) as authoritative

## Revised OpenSpec disposition matrix

| Dimension | Fire 13 verdict | GPT-5.5-informed revision | Action |
|---|---|---|---|
| AGENTS.md emptiness | EMPTY ❌ | ✅ VERIFIED EMPTY | UNCHANGED — Fire 13 correct |
| WORKSPACE_REIMPLEMENTATION | ACTIVE refactor | ✅ VERIFIED active | UNCHANGED — Fire 13 correct |
| Cross-tool integration | UNKNOWN | **29 tools documented** | Material upgrade |
| SRA D7 (Anthropic-aligned) | UNKNOWN | PARTIAL | Score upgrade |
| Architecture state vs spec-kit | "REIMPLEMENTATION = less mature" | UNCHANGED — workspace is unstable | Concern preserved |
| spec-kit comparison framing | spec-kit MATERIALLY MORE MATURE | **SEMI-CORRECT** — spec-kit MORE MATURE on AGENTS.md + workspace stability; OpenSpec COMPARABLE on cross-tool reach | Refinement |
| Disposition | DEFER vs spec-kit | **DEFER-with-narrower-reason** — primary blocker is workspace reimpl-in-progress, NOT cross-tool integration gap | Material narrowing |

## What changed vs what didn't

### CHANGED (GPT-5.5 corrections)
- Cross-tool integration claim: UNKNOWN → 29 tools documented
- SRA D7: UNKNOWN → PARTIAL
- Spec-kit framing: MATERIALLY MORE MATURE → SEMI-CORRECT (only on AGENTS.md + workspace stability axes)
- DEFER reasoning: 4 reasons → narrowed to 2-3 reasons (workspace instability + AGENTS.md format-divergence)

### UNCHANGED (genuine residual concerns)
- AGENTS.md empty (0 LOC verified)
- WORKSPACE_REIMPLEMENTATION_DIRECTION.md + START_HERE.md still pre-implementation (not yet shipped)
- `docs/cli.md:170` confirms workspace commands "under active development and are not ready for use yet"

## Revised OpenSpec disposition

**Fire 13 said**: DEFER vs spec-kit (4 reasons)

**GPT-5.5-informed revision**: **DEFER-with-narrower-reason** — workspace reimplementation incomplete is the load-bearing reason. Cross-tool integration is comparable to spec-kit (not "unknown"). AGENTS.md format-divergence is a format choice, not a gap.

**Re-evaluation triggers**:
1. WORKSPACE_REIMPLEMENTATION_* completes (slices implemented + workspace commands stable per `docs/cli.md` removal of "not ready for use yet" warning)
2. AGENTS.md gets populated (or OpenSpec maintainers explicitly choose NOT to follow AGENTS.md format)
3. Fission-AI publishes named-practitioner adoption story

## Closed-loop disposition

Per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome A`:
- Fire 13 file 01 had 1 OVER claim (cross-tool integration UNKNOWN — refuted) + 2 VERIFIED claims
- GPT-5.5 Fire 16 returned NEEDS-REVISION conf=0.94
- Outcome A ACCEPT-WITH-DOC ship: Fire 16 corrections + W134-F17+ OpenSpec decision uses corrected verdict

## Cross-model gate state

✅ **SATISFIED for OpenSpec** (3 claims audited; conf=0.94)
✅ **SATISFIED for letta** (2 claims audited; conf=0.93)
✅ **SATISFIED for PageIndex** (2 claims audited; conf=0.9)
⏸ PENDING for ARIS / verified-avoid Cohort 3 (queued W134-F17+)

## Mia ladder advance (within Fire 16)

n=1255 → n=1261 (+6: 3 corrections / revised disposition / re-evaluation triggers / closed-loop Outcome A / cross-model gate state / forward-only discipline per port-note-discipline §6)
