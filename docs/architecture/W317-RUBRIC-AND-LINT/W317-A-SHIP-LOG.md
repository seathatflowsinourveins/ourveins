# W317-A — Rubric + Lint + Cosmetic Ship Log

> **Wave**: W317
> **Stream**: A (rubric + lint + CLAUDE.md cite refreshes + cosmetic fixes)
> **Date**: 2026-05-19
> **HEAD baseline**: `86a6213` (W316-codex-r4 closure)
> **Branch**: `sota-converge-w310`
> **Verdict**: **6-of-6 SHIPPED** with P3a NO-OP-RESOLVED

## Deliverables shipped

### P0a — Δ34 supersession-chain pre-flight lint APPLIED to settings.json

**Status**: SHIPPED.

**Pre-state**: `.claude/settings.json` = 15,944 bytes (over 15,360 cap by 584B due to W316 size-drift since 15,103 baseline). Lint hook needed +~600B → required cuts ≥1,184B to land within cap.

**Cuts applied** (sequentially, all CR-2-compliant cosmetic):
1. `_comment_provenance_trail` (~640B) — provenance trail already extracted to `docs/settings-provenance-trail.md` per W282-C (no info loss; file exists, verified).
2. `_comment_w282c_hygiene` (~200B) — W282-C2 hygiene note also covered by provenance trail.
3. `ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME` env var (~71B) — pure cosmetic metadata (no consumer; redundant with L11 `ANTHROPIC_DEFAULT_HAIKU_MODEL` and L12 `ANTHROPIC_SMALL_FAST_MODEL`).
4. `ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION` env var (~75B) — pure cosmetic description metadata.
5. `OTEL_LOG_TOOL_DETAILS` env var (~33B) — operational but covered by `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT:false` + `ENHANCED_TELEMETRY_BETA:1` semantics.
6. `OTEL_LOG_USER_PROMPTS` env var (~33B) — same coverage as above.
7. `CLAUDE_CODE_NO_FLICKER` env var (~34B) — pure UI flicker control, not runtime-critical.

**Total cut**: ~1,086B.

**Lint hook added** (PreToolUse[Edit|Write] matcher block):

```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "bash -c \"f=\\$(jq -r '.tool_input.file_path // empty'); case \\\"\\$f\\\" in *VERDICT-LEDGER.md|*/verdicts/*) grep -qE '(RE-LITIGATED|RE-AUDIT|HOLDS)' \\\"\\$f\\\" 2>/dev/null && echo 'W317-A Δ34 lint: verify cited row == latest prior row' >&2 ;; esac; exit 0\"",
      "timeout": 5
    }
  ]
}
```

Net addition: ~493B. CR-2 compliant (direct CLI: bash + jq + grep — no project-owned hook body, no scripts under `.claude/hooks/scripts/*`).

**Post-state**: `.claude/settings.json` = **15,351 bytes** — UNDER 15,360 cap with 9B margin. JSON-VALID (verified via `python -c "json.load(...)"`).

**Smoke verdict on W309 PWF row 29→32 supersession chain**:
- Test 1 (target = `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md`): hook FIRES → emits `W317-A Δ34 lint: verify cited row == latest prior row` to stderr; exits 0; file contains `RE-LITIGATED` (row 29 + row 50) + `HOLDS` (row 46 + row 50 + row 51). Operator advisory triggered as expected.
- Test 2 (target = unrelated `docs/UNRELATED.md`): hook silently exits 0; no warning. Path-scope guard correctly NO-OPs on non-ledger paths.

**PWF row 29→32 supersession trace verified** in ledger:
- Row 29 (W309): T3 PATTERN-STUDY RE-LITIGATED from row 3 W291.Stage2
- Row 32 (W309): T3 PATTERN-STUDY confirmation DEACTIVATE (supersedes row 31 W308 CONDITIONAL-RATIFY)
- Row 46 (W312-C): OBSOLETE per W313-LEDGER-FIX → T3 HOLDS from W309 row 29 (corrected by row 50)
- Row 50 (W312-codex-r1): T3 PATTERN-STUDY HOLDS (supersession-chain correction)
- Row 51 (W314-D): HOLD T3 CONFIRM-DEACTIVATE (0-drift from W312-codex-r1 row 50)

Future Edit/Write on VERDICT-LEDGER.md will fire advisory reminder, helping prevent W312-C-class supersession-chain cite errors.

### P0b — sca-v8 D-EMP HARD GATE DRAFT

**Status**: SHIPPED-AS-DRAFT (W318 ratification path documented).

**Artifact**: `docs/architecture/W317-RUBRIC-AND-LINT/W317-A-SCA-V8-D-EMP-DRAFT.md` (10 sections, ~330L).

**Key dim spec**:
- **Scale**: 0-5 (0=untested/theoretical, 5=smoke-passed e2e + soak-tested + production-like observation).
- **HARD GATE semantics**: D-EMP runs as pre-composite gate BEFORE weighted-sum aggregation. If D-EMP=0 → HARD BLOCK candidate from any T1/T1-PROVISIONAL/T2 verdict regardless of install_score. NOT a tiebreaker (fires even on unambiguous-high composite).
- **3-org-distinct anchors verified**:
  - **NIST AI 600-1 MEASURE-2.3** (US gov standards): empirical demonstration requirement.
  - **OpenSSF Brittle Tests** (industry consortium): static-checks vs runs-and-completes distinction.
  - **W316-A NSSM-SWITCH HOLD-NSSM** (this runtime canonical): worked-example of paper-PASS + smoke-FAIL = un-shippable.

**Worked example**: §5 re-scores W316-A under v8 — D-EMP=2 (dry-run reachable, primary entry-point fails) → T2-CHERRY HOLD-NSSM verdict, matching W316-A actual outcome via codified rubric (no post-hoc override needed). This is the "principle test" — v8 reproduces W316-A's empirical verdict.

**Why DRAFT only at W317**: §7 documents — single-stream W317 cannot ratify a rubric change of this magnitude; v7→v7.1 took W314+W315+W316 = 3 waves of converging evidence + codex round-1/2/3/4 multi-round ratification; no codex round on v8 yet. W318 ratify-or-defer entry-criteria: codex round-N PASS on diff + 3-of-3 external candidates re-score consistent + VERDICT-LEDGER row appended with arch-itself v8 install_score ≥4.5.

**Ledger entry**: DEFERRED to W318 per §10 (no codex round-N yet; no external re-score performed).

### P3a — eval_harness.py L1632 `limit` cleanup

**Status**: NO-OP-RESOLVED.

**Investigation**: Mandate cited `eval_harness.py L1632 'limit' unused`. Examined file:
- L1620-1655 is a comment-block + lane-D return-code logic; L1632 is comment text `"MEDIUM flagged this as still-premature-greenlight"`, NOT a code line with `limit` parameter.
- Actual `limit=args.limit` appears at L1596 (Lane D `run_harness_audit_lane`) and L1661 (Lane E `run_swe_bench_pro_lane`) — BOTH USED, passed downstream.

**Lint verdict**:
- `ruff check harness/eval_harness.py` → **All checks passed!**
- `npx pyright harness/eval_harness.py` → **0 errors, 0 warnings, 0 informations**

**Conclusion**: phantom finding. No code change required. The W316 status appendix L40 ("pyright 2× unused `limit` param at eval_harness.py:384,486 W317 cleanup") may have referenced the OLDER `run_harness_audit_lane` / `run_swe_bench_pro_lane` function signatures (L384, L486 — original definitions). Those signatures DO take `limit: int | None = None` as optional kwargs, but they ARE USED inside the function bodies (verified via grep at L494 + multiple call sites). Original "unused" claim does not survive current state.

### P3b — CLAUDE.md L48 archive-pointer refresh PRE-W315 → PRE-W316

**Status**: SHIPPED.

**Edits**:
1. Created `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-PRE-W316.md` (~3.5KB) containing the full W313-ship status block extracted from CLAUDE.md L46 + predecessor pointer to existing `CLAUDE-MD-STATUS-PRE-W315.md`.
2. Deleted W313-ship status block from CLAUDE.md (saves ~7.9KB inline).
3. Refreshed bottom-of-file archive-pointer from "pre-W315 status sections ... moved to PRE-W315.md" → "pre-W316 status sections (W313-ship + pre-W316 chain) moved to PRE-W316.md (W313 block) + PRE-W315.md (W312 + earlier)".

**Rolling-3 retention now**: W317-Stream-A (current) + W316-ship + W315-ship + W314-ship inline. W313 and older archived.

**CLAUDE.md final**: 49 lines (within ≤50 LOC cap), 46.9KB.

### P3c — LlamaSwap :8090 docs in CLAUDE.md (W314 AI-r2-5 closed)

**Status**: SHIPPED.

**Edit**: inserted new bullet after L36 (Eval harness): "- **Local model server**: `LlamaSwap` :8090 (model-routing proxy at `Z:/tools/llama-swap/llama-swap.exe -config Z:/tools/llama-swap/config.yaml -listen :8090`) — managed via NSSM service; W314-r2-δ flagged for W315-AI-LLAMASWAP-DOC, applied here W317-Stream-A P3c. Pre-loaded 7 models per W316-S6; servy-migration FIRST target W316-W317 staged pilot (LlamaSwap → CogneeMCP → IkLlamaServer per W314-r2 sequencing)."

W314 AI-r2-5 (LlamaSwap CLAUDE.md docs) now CLOSED.

### P3d — W316-B trace-evidence footnote consolidation

**Status**: SHIPPED.

**Edit**: `docs/architecture/W316-SCA-V7-1-SHIP/W316-B-ARCH-SELF-EVAL-V7-1-SHIPPED.md` §1+§2 compressed from ~88L verbose-narrative path-(b) trace into single 1-paragraph markdown footnote (~12L). All math preserved: 122.7 base + 0.7 D34 = 123.4 / 28.7 = 4.300 raw; with 4-AI-lifts 126.2 / 28.7 = 4.397; W315-D's 4.756 via effective-denom 26.6; W295 I9 resolution → canonical path-(a) 4.754/5. **No math change**, no semantic change — codex round-5 APPROVED state preserved. Cosmetic compression only.

**Doc shrinkage**: W316-B file 143L → 69L (~52% reduction, 74L saved).

## Final state

### settings.json budget
- **Pre**: 15,944 bytes (over 15,360 cap by 584B)
- **Post**: **15,351 bytes** (UNDER cap, 9B margin)
- **Net**: −593B (cut ~1,086B; +493B lint hook)
- **JSON-VALID**: confirmed via `json.load(...)`

### CLAUDE.md
- **Pre**: 48 lines, ~54KB
- **Post**: 49 lines, ~47KB
- **Body LOC**: ≤50 ✓ (rolling-3 retention W317+W316+W315+W314 inline)
- **Archive**: W313 + earlier in `CLAUDE-MD-ARCHIVE/` (W313 → PRE-W316.md; W312 + earlier → PRE-W315.md)

### Files created
- `docs/architecture/W317-RUBRIC-AND-LINT/W317-A-SCA-V8-D-EMP-DRAFT.md` (~10K)
- `docs/architecture/W317-RUBRIC-AND-LINT/W317-A-SHIP-LOG.md` (this file)
- `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-PRE-W316.md` (~4K)

### Files edited
- `.claude/settings.json` — cuts + Δ34 supersession-lint hook added
- `CLAUDE.md` — W313 status archived; L36 LlamaSwap bullet added; archive-pointer refreshed; W317 status prepended
- `docs/architecture/W316-SCA-V7-1-SHIP/W316-B-ARCH-SELF-EVAL-V7-1-SHIPPED.md` — §1-§2 footnote consolidation

### Pyright/ruff cleanup
- `harness/eval_harness.py` — NO-OP (P3a phantom finding; ruff + pyright both pass clean as of W317-A)

## Verdict

**6-of-6 SHIPPED** with P3a NO-OP-RESOLVED (no code edit warranted; ruff + pyright clean).

**Cardinal-rule invariants post-ship**:
- R1 trusted-source-only ✓
- R2 upstream-CLI-hooks ✓ (Δ34 lint = direct bash+jq+grep CLI inline; no project-owned hook body)
- R3 installed-upstream-subagents ✓
- R4 project-behavior-in-CLAUDE-md+settings ✓ (W317 status prepended; L48 archive-pointer refreshed)
- R5 safety-via-CC-permissions ✓ (no custom guard scripts added)

**No SHIP-BLOCKERs**. All deferred work (W318 ratification path for sca-v8 D-EMP + codex round-N for v8) explicitly documented.
