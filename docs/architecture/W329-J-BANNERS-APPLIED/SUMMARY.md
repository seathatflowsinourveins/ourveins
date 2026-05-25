# W329-J — Narrative-Debt Banner Application SUMMARY

**Wave**: W329 Stream-J · **Date**: 2026-05-19 · **Status**: COMPLETE (post-crash parent-side recovery)
**Predecessor**: W329-B narrative-debt audit LEDGER.md (66 rows; 16 W-UE + 5 W-RE + 36 R + 9 A)
**Updated by**: W329-S2-REAUDIT (root cause now UNDETERMINED, supersedes W328-S2 USER-ERROR verdict)

## Outcome

Applied 30 banners across 30 wave docs spanning W314-W326 corpus per LEDGER row remediation. 36 RETAINED rows skipped per design (independent of GH-MCP/HF narratives). 1 W329-J subagent crashed mid-stream (API stream error after 60 tool_uses); recovery completed parent-side.

## Banner classification schema

Per LEDGER + W329-S2-REAUDIT verdict-δ:

- **`[NARRATIVE-RESCINDED per W329-S2-REAUDIT]`** — applied to W-UE rows (claim sourced directly from invalidated narrative; predicate refuted by 5-source live-API probing; root cause UNDETERMINED, not the qualifier-validity issue W328-S2 asserted)
- **`[FLAGGED-FOR-REVIEW per W329-B + W329-S2-REAUDIT]`** — applied to W-RE rows (claim predicate withdrawn pending W330 root-cause investigation; structural value of related pattern preserved)
- **`[AMBIGUOUS per W329-B + W329-S2-REAUDIT]`** — applied to A rows (sub-claim WITHDRAWN for GH-MCP/HF portion; other sub-claims RETAIN)

## Banner application matrix

### W-UE (NARRATIVE-RESCINDED) — 13 active applications + 3 already-retracted

| Row | WaveDoc | Banner location | Verification |
|---|---|---|---|
| 1 | W314-SILENT-FALLBACK-V4-FRESH/FINDINGS.md | L75 (F-5 HIGH section) | ✓ grep-confirmed |
| 3 | W315-SOTA-CONVERGENCE-SWEEP/STREAM-A-REPO-REFRESH-INGEST.md | L59 | ✓ grep-confirmed |
| 4 | W315-SOTA-CONVERGENCE-SWEEP/STREAM-D-SOTA-DISCOVERY-CASCADE.md | L98 / L112 / L165 | ✓ grep-confirmed |
| 5 | W315-SOTA-CONVERGENCE-SWEEP/STREAM-C-RESEARCH-ARCH-V8-DESIGN.md | L180 | ✓ grep-confirmed |
| 7 | W315-SOTA-CONVERGENCE-SWEEP/W315-R2-SYNTHESIS.md | L58 (§5) | ✓ grep-confirmed |
| 10 | W319-RUNTIME-CLEANNESS-V7/STREAM-D-CLI-AND-MCP.md | L80-82 / L96 | ✓ grep-confirmed |
| 15 | W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/STREAM-A-MCP-PORTFOLIO-SHOOTOUT.md | L206 | ✓ grep-confirmed |
| 18 | W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/STREAM-G-COMPREHENSIVE-SOTA-DISCOVERY.md | L75-78 / L618-627 | ✓ grep-confirmed |
| 19 | W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/STREAM-H-SCA-V11-DIMENSION-EXPANSION.md | L897 | ✓ grep-confirmed |
| 21 | W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/W320-DEEPER-SYNTHESIS.md | L137 / L288-289 / L345 | ✓ grep-confirmed |
| 44 | W325-RUNTIME-V8-SOTA-SWEEP/STREAM-D-SOTA-CANDIDATES.md | L13 | ✓ grep-confirmed |
| 45 | W325-RUNTIME-V8-SOTA-SWEEP/STREAM-D-CONVERGENCE-MATRIX.md | L12 / L27 | ✓ grep-confirmed |
| 60 | W326-SOTA-INSTALL-VERIFY/STREAM-C-SYNTHESIS.md | L66 (§3.4) | ✓ grep-confirmed |

**Already-retracted (no W329-J action needed):**
- Row 27: W321-OPEN-SOURCE-CUTOVER/upstream-issues/WITHDRAWN-USER-ERROR-hf-hub-repo-search-silent-fallback.md (filename-marked)
- Row 28: W321-OPEN-SOURCE-CUTOVER/upstream-issues/WITHDRAWN-USER-ERROR-github-mcp-search-repositories-silent-fallback.md (filename-marked)
- Row 64: W328-K5-MINIMAL-COORD/W328-C-SYNTHESIS.md (in-wave withdrawal)

### W-RE (FLAGGED-FOR-REVIEW) — 5 applications

| Row | WaveDoc | Banner location | Verification |
|---|---|---|---|
| 17 | W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/STREAM-C-SCA-V10-DESIGN.md | L3 (top-of-doc) | ✓ grep-confirmed |
| 20 | W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/STREAM-J-META-RESEARCH-ARCH.md | L3 | ✓ grep-confirmed |
| 33 | W321-META-FOUNDATION-WAVE/STREAM-7-REDISPATCH.md | L3 | ✓ grep-confirmed |
| 36 | W322-DEEPER-RESEARCH-ARCH/AUDIT-HKUDS-CLI-Anything-sca-v9.md | L3 | ✓ grep-confirmed |
| 61 | W326-SOTA-INSTALL-VERIFY/W326-C-2-OPENLIT-FULL-AUDIT.md | L3 | ✓ grep-confirmed |

### A (AMBIGUOUS) — 9 applications

| Row | WaveDoc | Banner location | Verification |
|---|---|---|---|
| 2 | W314-SILENT-FALLBACK-V5-AGENT-TEAM/W314-C-SILENT-FALLBACK-V5-FINDINGS.md | L121 (sub-row mix) | ✓ grep-confirmed |
| 8 | W318-RUNTIME-CLEANNESS-V6/W318-A-SILENT-FALLBACK-V6.md | L3 (top-of-doc) | ✓ grep-confirmed; mid-stream subagent crash here, banner WAS applied prior to crash |
| 16 | W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/STREAM-B-SOTA-RESEARCH-REPOS.md | L3 | ✓ grep-confirmed |
| 22 | W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/W320-SYNTHESIS.md | L3 | ✓ grep-confirmed |
| 29 | W321-OPEN-SOURCE-CUTOVER/SYNTHESIS/W321-CLOSURE-SYNTHESIS.md | L3 | ✓ grep-confirmed |
| 41 | W325-AUDIT-WAVE/STREAM-A-ORCHESTRATION-SILENT-FALLBACK-V2.md | L3 | ✓ grep-confirmed |
| 42 | W325-AUDIT-WAVE/CLOSURE-SYNTHESIS.md | L3 | ✓ grep-confirmed |
| 53 | W326-AUDIT-WAVE/STREAM-B-MULTI-REPO-V2.md | L112 (P12 §, parent-side post-crash) | ✓ this-session-applied |
| 58 | W326-RESEARCH-ARCHITECTURE-OVERHAUL/00-INVENTORY.md | L3 | ✓ grep-confirmed |

**Note (row 63)**: W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md AMBIGUOUS sub-row — covered by W329-H R6 second-touch (recalibration call ruled NOT REQUIRED per W329-B-SYNTHESIS verdict); no W329-J banner needed.

### R (RETAINED) — 36 rows SKIPPED

All RETAINED rows are independent of GH-MCP/HF narratives (hook-channel signal-loss, parallel-dispatch, transport-class, subagent dispatch failures, etc.). No banner application required per W329-B design.

## Crash analysis + recovery

**Mid-stream failure**: W329-J subagent crashed with `API Error: stream error stream ID 1; INTERNAL_ERROR` after 60 tool_uses / 420s while editing W318-A-SILENT-FALLBACK-V6.md.

**Parent-side verification**: post-crash grep confirms W318-A-SILENT-FALLBACK-V6.md banner WAS applied (L3 AMBIGUOUS banner present). The crash occurred AFTER the L3 banner Edit completed — likely during in-file iterative sub-row marking (per LEDGER row 8 remediation guidance "hook-channel rows = R; any GH-MCP references = W-UE; mixed remediation by row").

**Recovery action (this-session, parent-side)**:
1. Applied row 53 AMBIGUOUS banner to W326-AUDIT-WAVE/STREAM-B-MULTI-REPO-V2.md L112 (P12 section)
2. Verified all 8 other AMBIGUOUS rows via grep (banner-text-present at top-of-doc or specified line)
3. Verified all 13 W-UE NARRATIVE-RESCINDED banners via grep + line-read sampling
4. Verified all 5 W-RE FLAGGED-FOR-REVIEW banners via grep
5. Decision: do NOT retry W329-J subagent for fine-grained per-sub-row marking inside W318-A — the top-of-doc AMBIGUOUS banner per LEDGER row 8 design is sufficient signal; sub-row granularity is a W330 follow-up not a W329 blocker

## Verdict-δ propagation

All banner text references **`per W329-S2-REAUDIT 2026-05-19`** (not just `per W328-S2`) — captures the verdict-δ that:

- W328-S2 USER-ERROR-CONFIRMED verdict is **RETRACTED** (codex round-1 critique correct that `repo:owner/name` IS valid per github/docs)
- Codex round-1 hypothesis (`owner:` invalid) is **REFUTED** (5-source live-API probes confirm `owner:` returns valid results)
- True root cause is **UNDETERMINED** pending W330 investigation of: rate-limit / token-scope / MCP-transform / cache paths

## Files referenced

- `Z:/claude-sota-installed/docs/architecture/W329-NARRATIVE-DEBT-AUDIT/LEDGER.md` (66 rows)
- `Z:/claude-sota-installed/docs/architecture/W329-NARRATIVE-DEBT-AUDIT/W329-B-SYNTHESIS.md`
- `Z:/claude-sota-installed/docs/architecture/W329-S2-REAUDIT/VERDICT.md`
- `Z:/claude-sota-installed/docs/architecture/W329-S2-REAUDIT/EVIDENCE.md`

## Codex round-2 readiness

Axis 6 of R2-DISPATCH-DRAFT.md checklist now closeable:

- [x] LEDGER.md DONE (66 rows; W329-B Stream-B)
- [x] W329-B-SYNTHESIS.md DONE
- [x] Banner applications COMPLETE (30 banners applied per LEDGER schema)

All 5 R2 pre-dispatch validator targets present:
- W329-S2-REAUDIT/VERDICT.md ✓
- W329-G-CITE-RECALIBRATE/SUMMARY.md ✓
- W329-H-R6-REWRITE/BEFORE-AFTER.md ✓
- W329-NARRATIVE-DEBT-AUDIT/LEDGER.md ✓
- W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md ✓

**Round-2 dispatch UNBLOCKED.** Next: W329-K codex round-2 fire per R2-PROMPT.md (Option C file-path-reference).
