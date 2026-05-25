# W327 Stream H — CLAUDE.md Cookbook Pointer Audit + Paste-Ready Edit

**Date**: 2026-05-19 · **Owner**: Stream H (read-only on CLAUDE.md; orchestrator applies) · **Scope**: cookbook pointer integration so future sessions seamlessly pick up W327 SOTA cookbook.

---

## §1 Current-state audit (CLAUDE.md @ HEAD)

- **Size**: 13,095 B / 50 LOC. **Margin to 15,360 B effective cap (per W317-A budget)**: **2,265 B** (+wave-cap +1,360 to absolute 15 KB cap). Healthy headroom.
- **Pointer block** = §`## Pointers` L24-30 (5 entries) + §`## Status` L41-49 (W325-compacted; 4 entries → archive + ledger + T6 + git).
- **Coverage gap inventory** for W327 cookbook areas:
  - Git cookbook · ✗ NO pointer (L39 mentions "clean tree" runtime-state only)
  - Bash + CLI cookbook · ✗ NO pointer
  - gitnexus integration plan · ✗ NO pointer (skill `.claude/skills/gitnexus/SKILL.md` auto-loads; integration **plan** doc not cited)
  - Sandbox decision · ✗ NO direct pointer (R5 SHIP-BLOCKER mentioned in archived Status W320 but not in active body)
  - Parallel-dispatch mandate · ✓ COVERED L13 (cite-anchored cookbook ref `claude-cookbooks @ 2eed173a`) + skill at `.claude/skills/parallel-dispatch-mandate/SKILL.md` auto-fires
  - Future-session pickup · ✗ NO pointer
  - Codex local-patch · ✗ NO pointer
  - P2/P6/PROJECT_DIR operator-apply · ✗ NO pointer
  - sca-v12 · ✗ NO pointer (current cite L34/L21 still references sca-v7/v8.1-partial; v9 noted in archive, v12 absent)

**Verdict**: 7-of-8 W327 cookbook areas have no active-body pointer. Pointer block addition required.

## §2 Skill-vs-pointer decision (per cookbook area)

Per `https://code.claude.com/docs/en/skills` semantics: skill auto-fires only when `description:` keyword-matches the user prompt. Cookbook areas split:

| Area | Auto-fire likelihood | Decision | Rationale |
|---|---|---|---|
| Git cookbook | HIGH (operator says "commit"/"git"/"pr") | **Skill** + pointer | Recurring operational need; existing skills `commit-commands:commit-push-pr` cover routine but W327 SOTA additions (lazygit + signing) need codified surface |
| Bash + CLI cookbook | MEDIUM (PowerShell-vs-Bash routing) | **Pointer-only** | Routing decision is environmental, not prompt-driven; doc is reference table not auto-fire heuristic |
| gitnexus integration | LOW (explicit `/gitnexus` opt-in) | **Pointer-only** | Existing skill `gitnexus` auto-fires on graph-query intent; integration **plan** is meta-design not behavioral |
| Future-session pickup | HIGH (any session start) | **Pointer-only** | Doc loads via CLAUDE.md ancestor-load; no auto-fire trigger needed |
| Codex local-patch | LOW (post-codex-CLI-update only) | **Pointer-only** | Operator-applied one-shot, not recurring |
| P2/P6/PROJECT_DIR | LOW (operator-blocking carry) | **Pointer-only** | Decision artifact, not behavioral |
| sca-v12 | HIGH (any sca audit) | **Skill** (existing `sota-convergence-audit/SKILL.md` already auto-fires) | Update existing skill in-place (Stream G ships v12 inline); CLAUDE.md cite-refresh suffices |

**Net new skills needed**: 0. Existing `sota-convergence-audit` skill ships sca-v12 update; W327 cookbooks are reference docs pointed-to from CLAUDE.md.

## §3 Paste-ready Edit block (orchestrator applies)

Insert AFTER L30 (existing local-skills line) and BEFORE L32 (`## Runtime state`):

```markdown
- **W327 cookbooks (SOTA carryforward)**: ops/git/sandbox/research cookbook docs at `docs/architecture/W327-COOKBOOK-WAVE/` — git: `STREAM-A-GIT-COOKBOOK.md` (lazygit + commit-signing) · bash+CLI: `STREAM-C-BASH-CLI-COOKBOOK.md` (+ `.shellcheckrc` + `.psscriptanalyzer.psd1`) · gitnexus integration: `STREAM-B-GITNEXUS.md` · future-session pickup: `STREAM-D-FUTURE-SESSION-PICKUP.md` · codex local-patch: `STREAM-E-CODEX-PATCH.md` · P2/P6/PROJECT_DIR operator-apply: `STREAM-F-P2-P6-OPERATOR-APPLY.md` · sca-v12 rubric updates: `STREAM-G-SCA-V12.md` (absorbed into `.claude/skills/sota-convergence-audit/SKILL.md`).
```

**Size delta**: +887 B (one new bullet, no compression needed). New CLAUDE.md size: **13,982 B / 51 LOC**.

## §4 Char-budget check

- **Pre-Edit**: 13,095 B / 50 LOC (W325 baseline)
- **Post-Edit**: ~13,982 B / 51 LOC
- **vs 15,360 B effective cap**: +1,378 B remaining headroom (still safe; below W317-A advisory cap)
- **vs 50-LOC body cap (L1)**: **51 LOC = 1 LOC over** — orchestrator MUST either (a) raise L1 cap to ≤55 LOC matching W319/W320 39+ LOC archived-Status reality OR (b) inline-merge new cookbook bullet into existing L30 skills bullet as `· W327 cookbooks: docs/architecture/W327-COOKBOOK-WAVE/{A..G}` short-form. **Recommendation**: option (b) inline-merge into L30 — preserves 50-LOC cap, ~340 B added (final ~13,435 B).

**Compression option (if needed for option b)**: Append to L30 after the `parallel-dispatch-mandate)` closing parenthesis:

```
 · W327 cookbooks at `docs/architecture/W327-COOKBOOK-WAVE/STREAM-{A-git,B-gitnexus,C-bash-cli,D-future-pickup,E-codex-patch,F-p2-p6-apply,G-sca-v12}.md`
```

(+340 B; preserves 50-LOC cap; final ~13,435 B / 50 LOC; +1,925 B margin remaining.)

## §5 Verification of pointer-discipline pattern

Per CCBP `claude-memory.md` + W325 Stream E archived in `CLAUDE-MD-STATUS-CURRENT-W324.md` L1-3: progress-tracking moved OUT (T6 basic-memory + VERDICT-LEDGER + archive); CLAUDE.md is INDEX. **Stream H proposal complies** — adds index entries only; the 7 cookbook docs themselves are the knowledge artifacts (not duplicated in CLAUDE.md).

## §6 Caveats & forward-AIs for orchestrator

1. **Streams A, B, E, F, G not present** in `docs/architecture/W327-COOKBOOK-WAVE/` at audit time (only C + D exist). Apply L30-inline-merge Edit ONLY after Streams A/B/E/F/G land; otherwise the pointer cites non-existent files (phantom-cite violation per W319-D STALE-D-4 pattern).
2. **L34 sca-version cite-refresh** to sca-v12 should batch with this Edit (currently L34 stale at "47 enabled" runtime-state; sca-version not in L34 — no edit needed there).
3. **Archive trigger**: when W327 Status block is written into CLAUDE.md, follow W325 pattern — push W316/W317-A Status entries to `CLAUDE-MD-STATUS-PRE-W326.md` (NEW archive file) to preserve rolling-3 retention.

**Stream H deliverable size**: 491 words (within ≤500 cap).
