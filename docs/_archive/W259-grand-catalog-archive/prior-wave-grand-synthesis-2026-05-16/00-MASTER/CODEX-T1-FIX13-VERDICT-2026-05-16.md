# CODEX T1 CROSS-MODEL VERDICT — V-FINAL fix13 audit

**Date**: 2026-05-16 17:26 UTC
**Auditor**: codex-cli 0.130.0 GPT-5.5 (Path P foreground+tee dispatch)
**Cross-model gate**: cardinal-rule-3 satisfied via real GPT-5.5 subprocess (NOT depletion-mode stand-in)
**Full transcript**: `05-codex-consults/codex_consult_fix13_audit_OUT-2026-05-16.txt` (961 lines / 98 KB)
**Prompt**: `05-codex-consults/codex_consult_fix13_audit_PROMPT.txt`

---

## VERDICT: NEEDS-REVISION (confidence 0.84)

The catalog is **not collapsing** — most high-risk marketing claims are flagged, and spot-checks support several key repos as real. However, it is **not fit for V-FINAL fix13 commit as-is** due to fix14 propagation gaps and metadata drift between MASTER vs INDEX vs GRAPHQL-FINAL-MISSING.

---

## §A — DIMENSION SCORECARD

| Dimension | Result |
|---|---|
| (a) Internal consistency | **FAIL** (3 HIGH + 2 LOW/MED findings) |
| (b) Cardinal-rule-3 cross-model gate | **PARTIAL** (audit trail mismatches: 15 vs 14 vs 13) |
| (c) Hallucination risk (10 P0 spot-checks) | **0 confirmed hallucinations**; 3 LOW + 7 MED risk |
| (d) Saturation claim validity | **OVERSTATED** (single GraphQL probe ≠ proof of absence) |
| (e) Factual error spot-checks | **2 doc-consistency errors** (lsp-ai + Dolphin status drift); 0 repo-existence hallucinations |

---

## §B — TOP 3 HIGH-SEVERITY FINDINGS (must-fix before commit)

### Finding 1 — fix-round count drift (HIGH)

- **MASTER L18**: "15 codex T1 audits with 14 Pattern-A fix-forward rounds (fix1→fix14)"
- **INDEX L95, L100**: still says "13 fix-forward rounds" / "fix13"
- **Resolution**: Either revert MASTER §6 fix14 row OR bump INDEX to "fix14" semantic version

### Finding 2 — fix14 downgrade/defer not propagated to P0 tables (HIGH)

- **MASTER L272 fix14**: `SilasMarvin/lsp-ai` → DOWNGRADE to STUDY-PATTERN-ONLY (stale 16mo); `bytedance/Dolphin` → DEFER STUDY-PILOT until LICENSE manually verified
- **INDEX L64-65**: still lists both as "fix13 net-new P0 STUDY-PILOT candidates"
- **GRAPHQL-FINAL-MISSING §B L154-155**: still lists both in "Top STUDY-PILOT promotions (10 P0)"
- **Resolution**: Edit INDEX P0 table to mark `lsp-ai` as DOWNGRADE-PATTERN-ONLY and `Dolphin` as DEFER-LICENSE-PENDING; mirror in GRAPHQL §B; reduce "10 P0" → "8 P0 + 1 PATTERN + 1 DEFER"

### Finding 3 — Layer-count off by one (MEDIUM)

- **MASTER L13, L166**: "25 super-layers + 30+ sub-lanes"
- **§3 enumeration**: if `L0` and `L0.1` are counted separately, total is 26 top-level rows
- **Resolution**: Either re-count to 26 OR define "super-layer" precisely (e.g. excluding L0.1.5 as a sub-lane of L0.1)

---

## §C — LOW/MED FINDINGS (acceptable for V-FINAL with note)

- File count drift: MASTER L21 says 1,425; L235 says 1,418; local `find` returns 1,428 (negligible — files added/removed during session)
- Repo totals: "1,855 unique repos" vs "2,200 data rows" — distinction unclear but defensible (unique-after-dedup vs raw row count)
- 10 P0 spot-checks: ZERO confirmed hallucinations; 3 LOW (pyrefly, agent-framework, lsp-ai existence) + 7 MED (others need direct `gh api` confirmation, which fix14 partially did)

---

## §D — SATURATION CLAIM (recommended rewording)

**Current MASTER L271**: "3 AXES SATURATION-CONFIRMED: L1.0 LLM Gateway, L1.5 Token Compression, L5.0 Security/CVE"

**Codex critique (epistemically valid)**: A single GraphQL topic-filter probe returning ZERO results is a *heuristic signal*, not proof of absence. The corpus could have ≥1k★ candidates that:
- Don't use the specific topic tags probed
- Are in adjacent layers (e.g. multi-purpose security tools that also handle L5.0)
- Were created in the GraphQL query gap window

**Recommended rewording**: "3 AXES SATURATION-SIGNAL (no additional candidates surfaced in this probe; heuristic — not proof of absence)"

---

## §E — OPERATOR DECISION MATRIX

| Path | Action | Cost | Outcome |
|---|---|---|---|
| **Path A** (Pattern-A fix15) | Edit INDEX + GRAPHQL §B to propagate fix14 changes; rename to "V-FINAL fix14" | ~10min | NEEDS-REVISION → ACCEPT-WITH-NOTES |
| **Path B** (ship-as-is with note) | Append "V-FINAL fix13 audit verdict: NEEDS-REVISION — see CODEX-T1-FIX13-VERDICT-2026-05-16.md" to MASTER + commit | ~2min | NEEDS-REVISION → ACCEPT-WITH-NOTES-DEFERRED |
| **Path C** (revert fix14) | Delete MASTER fix14 row, restore "13 rounds" claim, ship as pure V-FINAL fix13 | ~2min | NEEDS-REVISION → ACCEPT-AS-FIX13 (but loses lsp-ai/Dolphin verification value) |

**Recommended**: **Path A** (fix15 propagation round) — preserves fix14 verification value while restoring internal consistency. Per cardinal-rule-3, this would require ANOTHER codex T1 audit before commit if Pattern-A discipline is strict, OR Path A can ship with self-documented fix14→fix15 trail since fix15 is mechanical doc-sync (not new claims).

---

## §F — CARDINAL-RULE-3 GATE STATUS

**Satisfied at THIS arc** — real GPT-5.5 codex subprocess dispatched via Path P (codex-cli 0.130.0 foreground+tee, 60,711 tokens used, web-search-augmented spot-checks on 7/10 P0 repos). Confidence 0.84 (acceptable for NEEDS-REVISION verdict; would need >0.90 for ACCEPT).

Per `Z:/claude-sota/.claude/rules/cross-model-consensus.md`, the audit trail is fully recoverable from:
- `05-codex-consults/codex_consult_fix13_audit_OUT-2026-05-16.txt` (full transcript)
- `05-codex-consults/codex_consult_fix13_audit_PROMPT.txt` (prompt as-sent)
- This summary file

---

## §G — STATUS

**V-FINAL fix13 is BLOCKED for commit pending Path A (fix15 propagation) or Path C (fix14 revert)**.

Codex T1 audit complete. Operator decision required.
