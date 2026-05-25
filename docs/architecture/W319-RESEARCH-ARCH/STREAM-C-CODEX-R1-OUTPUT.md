# W319 Stream C — Codex Round-1 Output

> **Wave**: W319 Stream C
> **Date**: 2026-05-19
> **codex CLI**: codex-cli 0.130.0 via `codex-companion.mjs task --effort high`
> **Model**: GPT-5.5 cross-model gate
> **Prompt file**: `tmp/W319-stream-c-codex-r1-prompt.txt` (5517 chars)
> **Output file**: `tmp/W319-stream-c-codex-r1-output.txt`
> **Thread ID**: `019e410b-691f-7331-8395-c4cf8f342210`
> **Turn ID**: `019e410b-8108-79c1-bbe0-65c4bf9cce66`

## §1 — Raw verdict

```
VERDICT: REVISE

No HIGH/CRITICAL bias finding, but one MEDIUM consistency defect must be fixed before SKILL.md lands.

Criteria 2-5 mostly pass: D35 W_install=1.0 is defensible by operator emphasis and sensitivity
does not depend on that weight; W295 I9 extension to D-EMP is principled, not required to
rescue the score; 131.5 / 27.4 = 4.799 is reproducible from the cited W314/W316/W319 chain;
and the v3 invariants remain additive rather than replacing the ladder.

Revision required under Criteria 1 and 5: the D-EMP threshold text is internally inconsistent.
The spec says **D-EMP=1 → SOFT WARN** and **D-EMP≥2 → no special handling**, but the W316-A
NSSM worked example says **D-EMP=2 → SOFT-WARN range / T2-CHERRY ceiling**. Pick one.

Recommended fix: keep D-EMP=2 as "no special handling" and state that NSSM remains
T2-CHERRY/HOLD because the empirical failure lowers/blocks via composite or other routing
evidence, not because D-EMP=2 itself imposes a ceiling.

Alternative: rescore NSSM D-EMP as 1 if the evidence is only conceptual/paper-level.

After that correction, I would APPROVE.
```

## §2 — Verdict classification

**VERDICT: REVISE** — round-2 required after applying fix. NO HIGH/CRITICAL findings.

| Criterion | Status |
|---|---|
| 1. Δ42 D-EMP HARD-GATE placement correct verdicts on W316-A/W314-r1/W315 | **REVISE** (D-EMP=2 worked-example inconsistency vs scale spec) |
| 2. Δ45 D-CCRT W_install=1.0 weight justified vs operator-mandated emphasis | PASS |
| 3. W295 I9 extension to D-EMP is principled (NOT math-fudge) | PASS |
| 4. Arch-itself install_score 4.799/5 reproducible from cite-anchors | PASS |
| 5. 10 v3 invariants preserved (additive NOT replacement) | **REVISE** (same finding as #1) |
| 6. NO HIGH/CRITICAL findings preventing SKILL.md edit this wave | PASS (only MEDIUM) |

## §3 — Finding details

**MEDIUM F1**: D-EMP scale §2.2 says:
- "D-EMP=1 → SOFT WARN" (T2-CHERRY ceiling)
- "D-EMP ≥2 → no special handling"

But W316-A worked example §2.7 + spec §2.3 says:
- "D-EMP=2 is in SOFT-WARN range (1-2) → T2-CHERRY or lower permitted; T1 requires operator-explicit-override"

**Inconsistency**: scoring guidance §2.3 boundary "SOFT-WARN range" includes D-EMP=1 OR (1-2)? The two sentences in §2.3 contradict.

## §4 — Codex's recommended fixes (pick ONE)

### Option A (codex-RECOMMENDED): keep D-EMP=2 as "no special handling"

- §2.3 spec: D-EMP=0 → HARD BLOCK; D-EMP=1 → SOFT WARN (T2-CHERRY ceiling; T1 requires operator-override); D-EMP ≥2 → no special handling.
- §2.7 worked example: NSSM remains T2-CHERRY/HOLD because EMPIRICAL FAILURE lowers/blocks via OTHER ROUTING EVIDENCE (e.g. composite-score below T1 threshold + W316-A explicit operator-AI HOLD), NOT because D-EMP=2 itself imposes a ceiling.
- Re-derive NSSM verdict: D-EMP=2 (no special handling) + install_score 4.60 (path-b) + W316-A operator-AI HOLD-NSSM → T2-CHERRY HOLD via OPERATOR-AI override, NOT via D-EMP ceiling.

### Option B (codex-ALTERNATIVE): rescore NSSM D-EMP as 1

- §2.7 worked example: NSSM uvx-stdio has D-EMP=1 (conceptual e2e diagram exists per W316-A migration sequence; install metadata "PARTIAL" was actually metadata-fetch but module path NEVER verified → re-read as paper-level only).
- D-EMP=1 → SOFT-WARN range → T2-CHERRY ceiling matches actual W316-A HOLD outcome.

## §5 — Selected fix path (Stream C decision)

**SELECTED: Option A** — keep D-EMP=2 as "no special handling".

**Rationale**:
- §2.2 scale "dry-run install attempted; install-vector resolves without error; binary/script reachable" describes D-EMP=2 AS uvx-stdio metadata-reachable. Re-reading as D-EMP=1 (Option B) would contradict the scale definition itself.
- Option A's resolution (NSSM HOLD via OTHER routing evidence) is more transparent: the W316-A actual outcome was a composite-of-evidence override (operator-AI HOLD + W298 SEV-1 prereq + cognee module path drift), NOT a single-dim ceiling.
- Preserves D-EMP scale §2.2 semantics + keeps scoring guidance §2.3 self-consistent (D-EMP=1 SOFT WARN; D-EMP ≥2 no special handling).

## §6 — Round-2 fix to apply

Edit STREAM-C-V8-1-PARTIAL-SPEC.md §2.3 + §2.7 + STREAM-C-ARCH-SELF-EVAL.md (no math change for arch-itself — D-EMP skip-N/A for arch unaffected) per Option A:

**§2.3 SOFT-WARN range correction**:
> Original: "D-EMP=1 → SOFT WARN: T2-CHERRY and below permitted; T1 requires operator-explicit-override"
> Final (no change to this sentence): "D-EMP=1 → SOFT WARN: T2-CHERRY ceiling; T1 requires operator-explicit-override + W-wave docket entry"
> Original: "D-EMP ≥2 → no special handling: normal weighted-sum applies"
> Final (no change): same.

**§2.7 worked-example correction**:
> Original (PROBLEM): "D-EMP=2 is in SOFT-WARN range (1-2) → T2-CHERRY or lower permitted"
> Replacement: "D-EMP=2 PASSES the HARD GATE (≥1 threshold). The W316-A T2-CHERRY HOLD-NSSM verdict is NOT enforced by D-EMP=2 itself (D-EMP ≥2 has no special handling per §2.3); rather it is enforced by W316-A operator-AI HOLD override + W298 SEV-1 LANGFUSE_SECRET_KEY env-file refactor prereq + cognee module path drift unresolved. Under v8.1-partial codified rubric, NSSM's composite install_score under v7.1 (4.60) WOULD route T1 INSTALL absent these out-of-rubric blockers. The principle test still PASSES — the rubric does NOT produce a CONTRADICTORY verdict to W316-A's actual outcome; it produces a COMPATIBLE verdict with explicit operator-AI override semantics."

## §7 — Round-2 plan (CLOSED)

1. ✓ Applied Option A fix to STREAM-C-V8-1-PARTIAL-SPEC.md §2.7 (D-EMP=2 NO special handling; NSSM HOLD via OPERATOR-AI OVERRIDE not D-EMP ceiling).
2. ✓ Fired codex round-2 with corrected spec embedded; Thread `019e410e-4dbc-7c71-a4dc-05f5d2639320`.
3. ✓ **VERDICT: APPROVE** received. SKILL.md edit unblocked this wave.

## §8 — Codex round-2 raw output

```
VERDICT: APPROVE

Round-2 fix closes the Round-1 MEDIUM F1 consistency defect. §2.7 now aligns with §2.3:
D-EMP=2 has no ceiling or special handling, passes the hard gate, and normal weighted-sum
routing applies. The NSSM example no longer attributes T2-CHERRY/HOLD to D-EMP=2; it
attributes the final HOLD to explicit out-of-rubric operator-AI override semantics plus
W298/module-path blockers.

No new HIGH/CRITICAL issue is introduced by the fix. The W316-A principle test still
passes because the rubric-level result is now stated as "T1 INSTALL candidate," while
the observed historical outcome is preserved through a separate override pathway. That
is internally coherent and avoids the prior contradictory threshold semantics.

Round-1 PASS criteria 2-6 appear unaffected by this localized rewrite.
```

**Latency**: round-2 returned ~30s (much faster than round-1's deeper file-inspection round).
