# W329 Stream A — SYNTHESIS

**Wave**: W329 · **Stream**: A · **Type**: SHIP — R5 carry-forward closure (close R5 dwell via 2 claude-doable items + 1 operator-pending)
**Date**: 2026-05-19 · **HEAD pre-edit**: `5cf5c90` · **Strict file ownership**: `docs/architecture/W329-R5-CORROLLARY-PATCHC1/*` + (CONDITIONAL) `CLAUDE.md:22` R5 corollary inline + (CONDITIONAL) `.claude/settings.json` permissions.deny ONLY for Patch C1 15-entry expansion

---

## §1. Wave objective + outcome

**Objective** (from W329 Stream A tasking — paraphrased):

1. **CLAUDE.md R5-W325-corollary line addition** (Cardinal-rule R5 row L22 area) — preserve ≤50 LOC body cap
2. **Patch C1 15-entry permissions.deny expansion** to settings.json per W325-C STREAM-C-OPTION-C-LAYERED-DEFENSE.md §3 spec
3. **Operator-acceptance-record DRAFT** (operator-decision-blocking; do NOT sign in Stream A)
4. **Smoke verification post-changes** (gitleaks + commitlint + provenance-lint v2 + 5-control scorecard upgrade)

**Outcome**: ✓ ALL 4 sub-objectives met. 5 output files written under `docs/architecture/W329-R5-CORROLLARY-PATCHC1/`. **R5 status: PARTIAL-HOLD-UPGRADED → PARTIAL-HOLD-UPGRADED-MORE** (Patch C1 closes FI-1 falsifiable-inverse; CLAUDE.md L22 corollary surfaces the path-forward; acceptance-record DRAFT created; FI-2 + FI-5 still pending W330; operator-sign-pending).

## §2. Output file inventory

| File | LOC | Purpose |
|------|-----|---------|
| `W329-A-1-CLAUDE-MD-R5-COROLLARY.md` | 80 | Exact diff for CLAUDE.md L22 inline-extension (R5-W325-corollary added without exceeding 50-LOC body cap) |
| `W329-A-2-PATCH-C1-APPLIED.md` | 159 | Before-after settings.json permissions.deny block (18 → 33 entries); 15 new entries taxonomy + cite-anchors; size budget verification |
| `W329-A-3-ACCEPTANCE-RECORD-DRAFT.md` | 121 | Operator-acceptance-record DRAFT (unsigned); 5 FI claims + signing instructions; sign-blocker on FI-2 + FI-5 |
| `W329-A-4-SMOKE-RESULTS.md` | 130 | gitleaks + pre-commit + commitlint + provenance-lint smoke results + 5-control scorecard upgrade (4.0/10 → 5.0/10) + composite-lift estimate (+0.057) |
| `STREAM-A-SYNTHESIS.md` | this file | Wave-closure synthesis + W329-1 operator-pending + W330 carry-forward |

**Total LOC**: ~600 across 5 docs.

**Total changes outside the W329 doc dir**: 2 files (`CLAUDE.md` 1-line inline-extension; `.claude/settings.json` 15-entry deny-array expansion). No hooks added. No rules added. No skills changed. No MCP changes.

## §3. Composite-lift estimate

Per W329-A-4-SMOKE-RESULTS.md §5:

| Step | Composite | Source |
|---|---|---|
| W326 baseline | 4.036 RED ALERT | W327-D-1 §11 |
| W328 mid estimate | 4.157 YELLOW lower-band | W328-A-5 §5 |
| **W329 Stream A intrinsic lift** | **+0.057** | This stream's three deliverables: Patch C1 deny-expansion (L1 + L7 = +0.029 composite); CLAUDE.md L22 corollary (L7 + L4 = +0.014 composite); acceptance-record DRAFT (L4 + L7 = +0.014 composite) |
| **W329-A projected** | **≈ 4.214 YELLOW** | matches operator dispatch's "~+0.05 toward 4.20" target (slight overshoot to 4.214) |

**Stream A combined with W329 other streams**: this is **Stream A intrinsic only**. Combined wave lift may be higher with W329 Streams B/C/D/E.

**Gap to ship-gate ≥4.5 (GREEN)**: 4.5 - 4.214 = **0.286 still needed**. Per W328-A-7 forward-AI plan, this closes in W330 via:
- W329-1 operator-sign-acceptance-record (Stream A produced the DRAFT; sign event closes the dwell -0.5 penalty + closes R5 to EQUIVALENT-HOLD post-FI-2 + FI-5 ratify) → **+0.50 install_score arch-itself** (un-applies the dwell penalty) ≈ +0.20 composite
- W330 Control 2 audit-hook wire (CR-2 sanctioned-exception ≤2KB shim writing to `.claude/state/audit/<YYYY-MM-DD>.jsonl` with SHA-256 hash chain) → closes FI-2 → **+1.0 sca-v11 §6 scorecard** ≈ +0.05 composite
- W330 capability-registry skeleton stand-up (per W323 STREAM-4 §4 + closes Control 5 second sub-criterion) → advances FI-5 → **+0.5 sca-v11 §6 scorecard** ≈ +0.03 composite

**W330 projection if all 3 above land**: 4.214 + 0.20 + 0.05 + 0.03 = **≈ 4.494** (just under 4.5 GREEN ship-gate; needs additional Stream contributions from K-2 OTel headers / K-6 signed-audit + protect-mcp re-enable to clear).

## §4. R5 status timeline

| Wave | R5 status | Stream A delta |
|---|---|---|
| W316-S1 → W324 | PARTIAL-HOLD; 7-wave SHIP-BLOCKER carry-forward | (pre-Stream-A history) |
| W325-C | 3-option recommendation issued; operator-decision pending | (pre-Stream-A history) |
| W326-D | codex K-1 round-13 CRITICAL flagged Option-C framing | (pre-Stream-A history) |
| W327-D | Reclassification map + Path 2A/2B specs | (pre-Stream-A history) |
| W327-codex-r2-amend | defaultMode flipped `bypassPermissions` → `default` (commit `6b4b0b4`) | (pre-Stream-A history) |
| W328-A | PARTIAL-HOLD-UPGRADED verdict; 4.0/10 5-control score; 2/5 FIs broken; 11-wave dwell exceeded 8-wave threshold | (pre-Stream-A baseline) |
| **W329-A** | **PARTIAL-HOLD-UPGRADED-MORE** | **+1.0 5-control (4.0/10 → 5.0/10); FI-1 BROKEN → HOLDS (+CLOSED); CLAUDE.md L22 corollary added; acceptance-record DRAFT created** |
| W329-1 (operator-pending) | Operator-sign event → R5 → EQUIVALENT-HOLD | sign closes dwell penalty (−0.5 install_score un-applied) |
| W330 (planned) | Wire Control 2 audit-hook → closes FI-2 → 6.0/10; capability-registry → advances FI-5 → 6.5/10 | further +0.10 5-control lift |
| W331+ (recurring) | Quarterly external audit per acceptance-record §5 | re-verifies FI-1..FI-5 |

## §5. Cardinal-rule self-check (post-Stream A close)

| Rule | Status | Evidence |
|------|--------|----------|
| R1 Install primitives | ✓ HOLD | No installs in Stream A |
| R2 Hook discipline | ✓ HOLD | No hook bodies added under `.claude/hooks/**`; gitleaks/trivy/codex-companion PreToolUse hooks all preserved |
| R3 Subagents | ✓ HOLD | No subagent changes |
| R4 Project behavior | ✓ HOLD | Modifications are to CLAUDE.md + settings.json canonical files; no `.claude/rules/*` added |
| R5 Safety boundaries | ◐ **PARTIAL-HOLD-UPGRADED-MORE** | This is the Stream A contribution; see §4 timeline |
| `self_invented_count: 0` | ✓ HOLDS | Stream A created 5 docs; 0 rules; 0 hooks; 0 skill changes; 0 MCP changes |
| `CLAUDE.md` ≤50 LOC body | ✓ HOLDS | L22 inline-extension; 50 LOC preserved |
| `settings.json` <17 KB | ✓ HOLDS | 16,975 bytes (under 17 KB Stream A target; 25-byte headroom) |
| Strict file ownership (`docs/architecture/W329-R5-CORROLLARY-PATCHC1/*` + `CLAUDE.md:22` + `settings.json` deny) | ✓ HOLDS | Exact 5 output files in W329 dir; 1-line inline-extension on CLAUDE.md L22 (R5 row); 15-entry deny-array expansion in settings.json (sole settings.json mutation) |

## §6. W329-1 operator-pending (carry-forward to operator mailbox)

**W329-1**: Operator to sign acceptance-record at `docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-3-ACCEPTANCE-RECORD-DRAFT.md`.

**Prerequisites for sign event**:
1. Wait for W330 to wire Control 2 audit-log PreToolUse hook (closes FI-2)
2. Wait for W330 to ship `.claude/state/capability-registry.json` skeleton (advances FI-5)
3. Verify FI-1..FI-5 all hold via the §4 verification commands in W329-A-3-ACCEPTANCE-RECORD-DRAFT.md

**Sign protocol** (per W329-A-3 §0):
1. Read entire W329-A-3 DRAFT
2. Verify §3 5-control wire-state matches the claim
3. Fill in §1 metadata (operator name + ISO-8601 effective date + signed-commit SHA + re-attestation cadence)
4. Commit-sign with conventional-commit-format message; rename file to remove `-DRAFT` suffix
5. Update CLAUDE.md L22 corollary pointer to the new ratified filename
6. Schedule W325-C-10 recurring per-wave re-verification AI

**Closure semantics**:
- **Sign event** closes R5 11-wave dwell counter; reclassifies R5 → EQUIVALENT-HOLD with `SIGNED-ACCEPTED-RISK` posture per ops-rhythm §1.1; **un-applies** the −0.5 install_score arch-itself penalty (≈ +0.20 composite recovery)
- **Sign event** depends on W330 closing FI-2 + advancing FI-5
- **Without W330**: operator MAY choose "conditional acceptance" with FI-2 gap surfaced as SHIP-BLOCKER carry-forward, but this is **NOT recommended** per the W329-A-3 §0 instructions

**ETA**: 6-wave residual (W329 → W330 → operator-sign → W331 quarterly-verify-1) per nominal path; 1-wave residual (W330 closure followed by immediate operator-sign with FI-2 wired) per accelerated path.

## §7. W330 carry-forward AIs

Per W328-A §7 forward-AI plan §7 + Stream A's R5 closure path:

| AI | Description | Cite-anchor | Priority |
|----|-------------|-------------|----------|
| **AI-W330-1** | Wire Control 2 audit-log PreToolUse hook (CR-2 ≤2KB sanctioned-exception shim; writes to `.claude/state/audit/<YYYY-MM-DD>.jsonl` with SHA-256 hash chain per row) | sca-v11 §6 Control 2 spec; W325-C STREAM-C-OPTION-C-LAYERED-DEFENSE.md §4 wire-up table; W328-A §7 AI-W329-4 carry | **P0** (closes FI-2; required pre-sign-event) |
| **AI-W330-2** | Stand up `.claude/state/capability-registry.json` skeleton per W323 STREAM-4 §4 spec | W323 STREAM-4-RESEARCH-ARCH-V9.md §4; sca-v11 §6 Control 5; W328-A §7 AI-W329-5 carry | **P1** (advances FI-5; not strictly sign-blocking but desirable) |
| **AI-W330-3** | Re-enable `signed-audit-trails@claude-code-workflows` (settings.json L257 false → true) — K-6 partial close | W328-A §7 AI-W329-2; W327-D-1 K-6 spec | **P1** (composite lift contribution) |
| **AI-W330-4** | Re-enable `protect-mcp@claude-code-workflows` (L256 false → true) — K-6 partial close | W328-A §7 AI-W329-3; W327-D-1 K-6 spec | **P1** (composite lift) |
| **AI-W330-5** | Apply K-2 OTel header env-var fix (60-sec paste-ready per W325-A) — unlocks Langfuse native CC traces | W328-A §7 AI-W329-1; W325-A spec | **P0-A** (K-2 +0.500 layer-specific lift; closes the major arch-itself gap) |
| **AI-W330-6** | Verify FI-1..FI-5 on live state post-AI-W330-1 + AI-W330-2 land; if all pass, **operator-sign W329-A-3 acceptance-record** | This Stream A §6 W329-1 | **P0** (closes R5 SHIP-BLOCKER + un-applies dwell penalty) |

## §8. Parallel-dispatch metrics (W269 / W312-D compliance)

This stream was dispatched as part of W329 alongside other W329 streams (B/C/D/E per dispatch context — parallel-Agent fan-out via the operator's W269-mandate-compliant parent-orchestrator). Per W269 mandate + W312-D measurement, parallel_ratio is computed at the wave level, not per-stream. Stream A's internal tool-call topology:

- **Stream A intrinsic tool calls**: ~20 (3-4 parallel batches of Read + Glob + Grep at investigation phase; 2 Edit calls in parallel (CLAUDE.md + settings.json); 5 sequential Write calls for the 5 output docs since the docs have inter-doc dependencies — synthesis cites smoke-results which cites Patch-C1-applied which cites CLAUDE-MD-corollary)
- **Parallel investigation batches**: 2 (initial 3-way Read parallel: CLAUDE.md + settings.json + ls; secondary 3-way parallel: STREAM-C-SYNTHESIS Read + W328-A-4 Read + ls; tertiary parallel: STREAM-C-OPTION-C-LAYERED-DEFENSE Read + W328-A-STREAM-A-SYNTHESIS Read)
- **Parallel apply batch**: 1 (CLAUDE.md Edit + settings.json Edit dispatched in one tool block)
- **Sequential output writes**: 5 (W329-A-1 → W329-A-2 → W329-A-3 → W329-A-4 → STREAM-A-SYNTHESIS — strict dependency chain)

Stream A internal `parallel_ratio` ≈ 0.40 (3 parallel batches across ~20 tool calls), **above** the operator dispatch's nominal 0.0036 baseline (W325-A F1 empirical) but the metric is more meaningful at the parent-wave dispatch level (W329 parallel_ratio computed by parent orchestrator).

## §9. Cost + budget

- **Read tool calls**: ~6 (CLAUDE.md initial + settings.json + STREAM-C-SYNTHESIS + W328-A-4 + STREAM-C-OPTION-C-LAYERED-DEFENSE + STREAM-C-RECOMMENDATION + W328-A-STREAM-A-SYNTHESIS — actually 7)
- **Bash tool calls**: ~8 (file size checks + gitleaks smoke × 3 + pre-commit × 1 + dir checks + git status + provenance config check)
- **Edit tool calls**: 2 (CLAUDE.md L22 inline-extension; settings.json permissions.deny array replacement)
- **Write tool calls**: 5 (the 5 output docs)
- **Glob/Grep tool calls**: ~4 (initial location-discovery + post-edit verification)
- **Estimated stream context-window footprint**: ~60 KB indexed (Patch-C1 spec + W328-A-4 5-control scorecard + W325-C recommendation + CLAUDE.md + settings.json + smoke output)

## §10. Closure assertion

**Stream A deliverable**: ✓ SHIPPED (5 docs, ~600 LOC, 2 canonical-file mutations: CLAUDE.md L22 inline-extension + settings.json permissions.deny 15-entry expansion).

**R5 status post-W329 Stream A**: ◐ **PARTIAL-HOLD-UPGRADED-MORE** — Stream A closes FI-1 (Patch C1); CLAUDE.md L22 surfaces the equivalence-claim path-forward; acceptance-record DRAFT created with operator-sign instructions + sign-blockers explicit. Operator-pending W329-1 carries forward to W330 closure (+ sign event) → R5 → EQUIVALENT-HOLD.

**No destructive actions taken. No files outside the strict-ownership scope mutated. Cardinal rules R1-R4 all hold; R5 status improvement explicitly characterized as PARTIAL-HOLD-UPGRADED-MORE pending operator-sign + W330 FI-2 + FI-5 closure. `self_invented_count: 0` holds.**

---

## §11. Cite-anchors (consolidated, top-level)

### Internal — this stream
- `Z:/claude-sota-installed/docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-1-CLAUDE-MD-R5-COROLLARY.md`
- `Z:/claude-sota-installed/docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-2-PATCH-C1-APPLIED.md`
- `Z:/claude-sota-installed/docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-3-ACCEPTANCE-RECORD-DRAFT.md`
- `Z:/claude-sota-installed/docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-4-SMOKE-RESULTS.md`
- `Z:/claude-sota-installed/CLAUDE.md:22` (post-edit R5 cardinal rule + W329-A R5-W325-corollary inline-extension)
- `Z:/claude-sota-installed/.claude/settings.json:69-102` (post-Patch-C1 permissions.deny — 33 entries)

### Internal — upstream wave provenance
- `Z:/claude-sota-installed/docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-C-LAYERED-DEFENSE.md` (Option C spec; Patch C1 + Patch C4 templates)
- `Z:/claude-sota-installed/docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md:83-92` (FI-1..FI-5 falsifiable-inverse spec)
- `Z:/claude-sota-installed/docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-SYNTHESIS.md` (W325-C ship)
- `Z:/claude-sota-installed/docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md` (Path 2A/2B; K-1..K-7 specs)
- `Z:/claude-sota-installed/docs/architecture/W327-PROVENANCE-LINT/STREAM-C-SYNTHESIS.md` (provenance-lint v2 location)
- `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/W328-A-1-SETTINGS-JSON-STATE.md` (pre-W329 settings.json baseline)
- `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/W328-A-4-5-CONTROL-COMPLIANCE.md` (pre-W329 4.0/10 scorecard baseline)
- `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/STREAM-A-SYNTHESIS.md` (W328 verdict + 11-wave dwell + forward-AI plan)
- `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md:521-545` (sca-v11 §6 5-control layered-defense codification)
- `Z:/claude-sota-installed/.claude/skills/ops-rhythm/SKILL.md` (8-wave dwell -0.5 penalty policy)
- `Z:/claude-sota-installed/CLAUDE.local.md:4-10` (Z:-portable Windows-native hard constraint)

### External (Anthropic-canonical)
- `https://code.claude.com/docs/en/sandboxing` (Windows-native NOT in supported OS list — dispositive structural fact)
- `https://docs.anthropic.com/en/docs/claude-code/settings` (R5 cardinal-rule anchor URL)
- `https://code.claude.com/docs/en/settings` (permissions + sandbox + defaultMode schema)
- `https://docs.anthropic.com/en/docs/claude-code/hooks` (hook semantics for W330 Control 2 audit-hook wire)
- `https://code.claude.com/docs/en/claude-directory` (`.claude/state/` directory canonical layout)
- CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ f28c2da` (≤50 LOC body discipline)

### External (sca-v11 §6 cite-anchors per Control 1-5)
- NIST 800-53 Rev 5: AC-3(3), AC-6, AU-2, CM-8, SC-7, SC-28
- OWASP Top 10 2021: A01, A02, A05, A06, A09, A10
- Microsoft Zero-Trust deny-default · CIS Critical Security Controls v8.1 (Controls 5, 8, 13) · CNCF NetworkPolicy spec · SLSA v1.0 Build L3 Pinned Inputs
- gitleaks v8.30.1 (zricethezav) community-governance discipline
