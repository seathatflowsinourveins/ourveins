# W325 Stream B — SYNTHESIS

**Date**: 2026-05-19
**Owner**: W325 Stream B
**Goal**: Multi-session work reconciliation + cross-wave consistency audit for the parallel-session work (W321 + W322 + W323 + W324 all bundled in `8e43c24`) against my W319-codex-r4 (`aee7240`) + W320 ship (`5cac3ec`/`e626cec`/`1360aeb`).

> **Scope discipline**: Strict file-ownership at `docs/architecture/W325-MULTI-SESSION-RECONCILE/` only. **NOT modifying** `VERDICT-LEDGER.md` or W324 docs (immutable historical per goal-predicate).

---

## §1 Headline findings (5 sentences)

1. **No git-level merge conflicts** — linear history clean across 4 commits in 10 minutes between `aee7240` (my W319-codex-r4) and `1360aeb` (my W320-codex-r2 HEAD); parallel session shipped `8e43c24` (W321+W322+W323+W324 bundled) 3 minutes BEFORE my W320 ship, but git fast-forwarded my W320 cleanly atop W324.
2. **All 4 of my W320 ledger rows #89-#92 verdicts SURVIVE sca-v9 re-verification with original tier intact** — the largest score Δ was −0.108 (protect-mcp install_score under corrected denom 34.7) which is well within the ≥0.5 tier-floor gap; sca-v9's ship-gate floor lifts (T1 install 4.0→4.5 / T2 pattern 3.5→4.0) **did NOT trigger any re-routing** because my W320 verdicts were already correctly T2 / T4.
3. **The sca-v9 SKILL.md §7 install denom arithmetic shows a 1.0 off-by-one** (stated 33.7 = 28.7 + 6×1.0; actual sum is 34.7) — this is a finding-to-flag for W326 codex-ratify; my W320 ledger row re-verify confirmed tier survives under BOTH 33.7 and 34.7 denoms so it is a documentation-only correction.
4. **W323-4 STREAM-4-RESEARCH-ARCH-V9 proposed 3 dims (D39=supply_chain_attestation + D40=layered_defense_depth + D41=degraded_mode_explicit) that DID NOT ship in W324's sca-v9** — W324 used the W321-7 proposal (mcp/opus/portable/loop semantics at D38-D41) instead; the W321-8 codex META blindspots #1+#2+#3 went to **R5 §6 5-control PROSE codification only**, not per-candidate scoreable dims. **W326 carry-AI**: decide whether to add those 3 dims at the next rubric bump.
5. **The convergent SHIP-BLOCKERS** (R5 `bypassPermissions:true` + sandbox `enabled:false` 7-wave SHIP-BLOCKER + SEV-1 Perplexity key rotation + ECC plugin-cache 21-day drift) **carry forward to W326 unchanged** — W324's R5 §6 5-control codification is rubric-only and operator-decision-pending; my W320 + parallel W324 dispositions converge on operator-action needed.

---

## §2 Deliverables index (4 docs total under `docs/architecture/W325-MULTI-SESSION-RECONCILE/`)

| Doc | Purpose | Length |
|---|---|---|
| `STREAM-B-COMMIT-MAP.md` | Commit-by-commit attribution mine vs parallel; identifies W321-W324 bundled in `8e43c24` | ~6 KB |
| `STREAM-B-W320-LEDGER-UNDER-SCA-V9.md` | Re-verify W320 rows #89-#92 under sca-v9 D38-D41 (+ tier verdict survival check) | ~17 KB |
| `STREAM-B-W321-W324-FINDINGS-DIGEST.md` | Parallel-session findings synthesis (8 W321 streams + W322 closure + 8 W323 streams + W324 ship) | ~16 KB |
| `STREAM-B-OPEN-ITEMS-RECONCILIATION.md` | De-dup'd P0/P1/P2/P3 backlog for W326+; 28 effective items from 76 raw | ~14 KB |
| `STREAM-B-SYNTHESIS.md` (this doc) | High-level synthesis tying all 4 above | ~5 KB |
| **Total** | — | **~58 KB across 5 docs** |

---

## §3 Cross-wave consistency verdict

### §3.A Convergent (consistent, non-conflicting) — 6 items

1. PWF v2.38.1 RE-ENABLE-IN-PLACE: convergent across my W320 row #89 + parallel W324 P7 PARTIAL + W321-5/W323-7 re-litigations.
2. wshobson security-triad routing: convergent across my W320 rows #90-#92 + W321-2 Stream-2 + W324 (no explicit ship action; ledger-only).
3. GitNexus PolyForm-NC operator-gate: convergent across W319 carry + W321-5 + W324 P7 PARTIAL.
4. `self_invented_count: 0` invariant: HOLDS in both sessions; W324 P0 STRENGTHENED via archival of 5 deprecated SKILL.md.
5. R5 7-wave SHIP-BLOCKER: convergent identification across W316-S1 + W314-E + W316-S4 + W316-S5-L7 + W317-S1 + W319-D + W324; operator-decision required.
6. CLAUDE.md ≤50 LOC body cap: HOLDS in both sessions (W324 CLOSURE:16 "40 body lines + appendix"; my CLAUDE.md unchanged).

### §3.B Semantic-but-not-blocking discrepancies — 4 items

1. **sca-v9 D39-D41 SEMANTIC OVERLOAD** (§3.B of findings-digest): W323-4 vs W321-7 vs actual W324 ship disagreement on what D39-D41 NAMES mean.
2. **My W320 rubric-cite drift** (§3.B): my `1360aeb` corrected this (citation footnote update only, not score re-computation).
3. **W324 SKILL.md §7 denom arithmetic** (§3.B + ledger-under-sca-v9 §6): 33.7 vs 34.7 off-by-1.0 — flagged for codex round.
4. **sca-v9 ship-gate floor lifts** (§3.B): T1 install 4.0→4.5 + T2 pattern 3.5→4.0 — operator should be AWARE future T1 verdicts harder to achieve.

### §3.C Open at W325 close — 28 items in reconciliation backlog

See `STREAM-B-OPEN-ITEMS-RECONCILIATION.md` §1-§7 for the P0/P1/P2/P3 breakdown:
- **P0 (3 items)**: R5 7-wave SHIP-BLOCKER operator-decision + SEV-1 Perplexity rotation + sca-v9 denom arithmetic codex-ratify
- **P1 (4 items)**: `/plugin install git-pr-workflows` + slsa-verifier install + ECC plugin update + Tavily/Exa env keys
- **P2 (9 items)**: hook gaps + GitNexus decision + SDK direct-API integration + wshobson SPOF doc + W326 sca-vN+ rubric revisit + shell defensive long-tail + W317-E upstream PRs + W325 rotation closeout
- **P3 (4 items)**: cosmetic doc-only cite-corrections + flock(2) Windows + CCBP cite drift + output style documentation

---

## §4 W326 forward-AI list (this stream)

| # | AI | Priority | Trigger |
|---|---|---|---|
| 1 | Codex round-N ratify W326-AI-1: SKILL.md §7 install denom 33.7 vs 34.7 arithmetic | P0 | Off-by-1.0 detected by W325-B re-verify; cite trail in ledger-under-sca-v9 §6 |
| 2 | Operator-decision R5 cardinal-rule: keep `bypassPermissions:true` as DRIFT-INTENTIONAL OR flip to deny-default per sca-v9 §6 5-control | P0 | 7-wave SHIP-BLOCKER convergent; sca-v9 §6 codified the 5-control policy but enforcement-side operator-side |
| 3 | Operator-action SEV-1 Perplexity API key rotation | P0 | W319 carry; W317-r2-SEV1-1; key still valid until rotated |
| 4 | Operator interactive `/plugin install git-pr-workflows@claude-code-workflows` | P1 | W324 P4 PARTIAL; paste-ready |
| 5 | Operator-action `go install github.com/slsa-framework/slsa-verifier/v2/cli/slsa-verifier@v2.7.0` | P1 | W324 P8 advisory-first; paste-ready |
| 6 | ECC `/plugin update` + re-apply W317 MSYS patch | P1 | W321-4 21-day drift; W319-S6 doubly-stale |
| 7 | TAVILY_API_KEY + EXA_API_KEY values populate (CLAUDE.local.md) | P1 | W324 P5 env-pending |
| 8 | Wire SessionEnd + UserPromptSubmit + SubagentStart/Stop hooks via existing upstream plugins (ECC `stop:cost-tracker` + `stop:evaluate-session` un-disable) | P2 | W321-1 3 HIGH-gap hooks |
| 9 | Decide W323-4 proposed dims (`supply_chain_attestation` + `layered_defense_depth` + `degraded_mode_explicit`) at next rubric bump | P2 | W323-4 not shipped in sca-v9; R5 §6 prose-only |
| 10 | Append W325 Stream B reconciliation pointer to CLAUDE.md status appendix | P2 | This wave's documentation visibility |
| 11 | VERDICT-LEDGER rows #89-#92 sca-v9 re-verify annotation (informational, post-codex-gate) | P2 | Per ledger-under-sca-v9 §8 recommendation |
| 12 | wshobson agent-teams F4 team-lead SPOF documentation | P2 | W321-2 §2 finding; no mitigation in W324 |
| 13 | W320 P5 shell defensive long-tail (16 HIGH × 12 .ps1) | P2 | W324 §carryover; bash-pro agent staged |
| 14 | W317 STREAM-E 4 upstream PRs operator-GH submission | P2 | W324 §carryover |
| 15 | W320 P7 CLAUDE.md cite-corrections (OllamaServe + LlamaSwap) | P3 | W324 §carryover; cosmetic |
| 16 | flock(2) SessionStart bare-resume detect (Windows POSIX path) | P3 | W324 §carryover |
| 17 | CCBP cite-anchor refresh `48f2ceb → 48798ca` (badge-only, no urgency) | P3 | W321-4 §2 |
| 18 | Document `outputStyle:"Proactive"` deviation in CLAUDE.md | P3 | W321-1 §Output styles |

**~18 forward-AIs total** (vs ~28 total open backlog items; difference = items not requiring direct W326 action like P3 cosmetics that can defer indefinitely + W325 close-completed items).

---

## §5 Cardinal-rule invariants (W325 Stream B)

- **R1** trusted-source primitives only: PASS (this stream is documentation-only; no install / hook / subagent / behavior changes).
- **R2** hooks plugin-shipped or direct-CLI: PASS (no hook changes).
- **R3** subagents installed-upstream: PASS (no subagent changes).
- **R4** project-behavior in CLAUDE.md + settings.json: PASS (no CLAUDE.md/settings.json edits this stream).
- **R5** safety boundaries via permissions/sandboxing: PARTIAL-HOLD carry-forward (W326-AI-2 P0 operator-decision required; sca-v9 §6 5-control codification is rubric-only).
- `self_invented_count: 0`: HOLDS.
- CLAUDE.md ≤50 LOC body: HOLDS.
- ALL 5 W325 Stream B docs (commit-map + ledger-under-sca-v9 + findings-digest + open-items-reconciliation + this synthesis) appended to `docs/architecture/W325-MULTI-SESSION-RECONCILE/` per goal-predicate file-ownership boundary.

---

## §6 Methodology + cost

- **Tool budget**: ~25 tool calls (Bash + Glob + Read + Write); within W325 ~30-min budget.
- **Cost**: ~zero codex tokens (no codex round fired this stream); native Anthropic SDK only.
- **Parallel-dispatch**: This stream is solo per goal-predicate ("STRICT FILE OWNERSHIP"); other W325 streams (if any) run independently.
- **Tokens consumed**: ~80 KB Read input + ~58 KB Write output (~10K tokens IO).

---

## §7 Final ratify statement

W325 Stream B closes with **5 doc deliverables synthesizing the parallel-session work (W321-W324) against my W319/W320 work into a single reconciled backlog**. **No tier verdicts in my W320 ledger rows #89-#92 change under sca-v9 re-verification**; the 4 sca-v9 new dims D38-D41 produced net-neutral score deltas. **3 substantive findings flagged for W326**: (a) SKILL.md §7 denom arithmetic 33.7 vs 34.7 off-by-1.0; (b) W323-4 proposed dims `supply_chain_attestation` + `layered_defense_depth` + `degraded_mode_explicit` not shipped in sca-v9; (c) sca-v9 ship-gate floor lifts (T1 install 4.0→4.5 + T2 pattern 3.5→4.0) should be operator-aware. **3 P0 SHIP-BLOCKERS carry forward unchanged**: R5 7-wave SHIP-BLOCKER + SEV-1 Perplexity rotation + sca-v9 denom arithmetic codex-ratify. **Cardinal-rule invariants R1-R4 HOLD; R5 PARTIAL-HOLD carry-forward**; `self_invented_count: 0` HOLDS.

---

## §8 Cites (master)

- `git log --format='%H %ai %s' aee7240..1360aeb` (4 commits)
- `git show --stat 8e43c24` (parallel W324 bundled file-list + footer)
- `docs/architecture/W324-WAVE/CLOSURE-SYNTHESIS.md` (P0-P8 disposition + carryover)
- `docs/architecture/W322-WAVE/CLOSURE-SYNTHESIS.md` (P0-P7 + 99% token reduction validation)
- `docs/architecture/W321-META-FOUNDATION-WAVE/STREAM-{1,2,3,4,5,6,7,8}*.md` (8 stream docs)
- `docs/architecture/W323-COMPREHENSIVE-AUDIT-WAVE/STREAM-{1..8}*.md` (8 stream docs)
- `docs/architecture/W320-AUDIT-WAVE/W320-C-{1,2}*.md` (PWF + wshobson security-triad scoring traces)
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` rows #89-#92 (my W320 ledger under v8.1-partial; rule_version cite-corrected by my `1360aeb`)
- `.claude/skills/sota-convergence-audit/SKILL.md` (sca-v9 spec §3 + §5 + §6 + §7 + §9)
- `docs/architecture/W325-MULTI-SESSION-RECONCILE/STREAM-B-COMMIT-MAP.md`
- `docs/architecture/W325-MULTI-SESSION-RECONCILE/STREAM-B-W320-LEDGER-UNDER-SCA-V9.md`
- `docs/architecture/W325-MULTI-SESSION-RECONCILE/STREAM-B-W321-W324-FINDINGS-DIGEST.md`
- `docs/architecture/W325-MULTI-SESSION-RECONCILE/STREAM-B-OPEN-ITEMS-RECONCILIATION.md`
