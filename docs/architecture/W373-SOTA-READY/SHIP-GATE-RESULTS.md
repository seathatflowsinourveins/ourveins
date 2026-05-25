# W373 Ship Gate Results
Generated: 2026-05-22T20:31:19Z

| Round | Verdict | Confidence | Source |
|-------|---------|------------|--------|
| Codex r1 (position-A attacker) | **BLOCK** | 0.93 | `tmp/W373-codex-r1-position-A.txt` |
| Codex r2 (position-B defender) | SKIPPED | n/a | `tmp/W373-codex-r2-position-B.txt` (r2 not dispatched per Step 5 BLOCK branch) |
| Eval lane (4-suite inspect_ai+promptfoo+RAGAS+DeepEval) | SKIPPED | n/a | Deferred — harness/eval_harness.py requires Anthropic API key, not in scope this session |

## Decision

**ESCALATE — DO NOT MERGE TO MAIN.**

Per the W373 P4 ship-gate procedure (Step 5):
> "If r1 BLOCK or NEEDS_MAJOR_REWORK: Do NOT auto-fix. Mark verdict = ESCALATE."

Codex r1 (GPT-5.5, position-A attacker, high effort) returned **BLOCK at confidence 0.93** with 8 substantive findings. R2 position-B defender was deliberately NOT dispatched — a BLOCK verdict at 0.93 confidence is not a borderline NEEDS_REVISION; it requires operator review before any further round.

## Codex r1 findings (verbatim, 8 items)

1. **`CLAUDE.md:36`** — Active root memory still says `T5 langfuse ✓ LIVE v3.174.1`, while `docs/architecture/W373-SOTA-READY/W373-FINDINGS.md:28` and `.claude/state/W373-jury-prep/W373-F002-brief.md:10` say Langfuse is crash-looping and the LIVE claim is false-by-evidence. **This is an unresolved CR-6 violation in the always-loaded file.** Prescription: either repair Langfuse and record a fresh reachability probe, or change `CLAUDE.md` to `DOWN/DEFERRED` before ship.

2. **`docs/architecture/W373-SOTA-READY/VERDICT-LEDGER-DRAFT.md:24-27`** — The P3 ledger assigns landed fixes to `W373-F006-F008-F009`, `F018`, `F012`, and `F005`, but the canonical manifest defines those IDs as different HIGH findings at `REMEDIATION-MANIFEST.md:86`, `:101`, `:102`, and `:109`. Example: ledger `F005` is a W336 stub, while manifest `F005` is everything-claude-code drift. Prescription: renumber the P3 rows and commit references to canonical IDs, then explicitly defer the true HIGH findings.

3. **`docs/architecture/W373-SOTA-READY/REMEDIATION-MANIFEST.md:82`, `:85`, `:86`** — Skill-count, W254 path, and W336 phantom-doc fixes were marked HIGH with "JURY before edit," but `README.md:45-48` and `VERDICT-LEDGER-DRAFT.md:24-27` show they landed as P3 remediations. **This violates Q2's jury-gate rule for HIGH items.** Prescription: run the jury retroactively and record verdicts, or revert those edits and re-land after jury approval.

4. **`docs/architecture/W373-SOTA-READY/VERDICT-LEDGER-DRAFT.md:14-16`, `:75-88`** — The ship ledger is still a draft with `<pending>`, `<SHIP / APPLY / ESCALATE>`, `<final-sha>`, and codex r1/r2 placeholders. `OP-SIGN.md:41-43` is also unsigned. Prescription: complete P4/P5, create ship-gate results, fill SHAs/verdicts, and obtain operator signoff before main merge.

5. **`docs/architecture/W373-SOTA-READY/README.md:37` and `VERDICT-LEDGER-DRAFT.md:63`** — Closeout claims "35 HIGH findings" with "34 queued," but the committed jury-prep directory contains 30 brief files. Even if coalescing explains the count, the docs currently overstate preparedness. Prescription: reconcile counts as `35 HIGH / 30 briefs / N coalesced / M unbriefed`, with explicit IDs.

6. **`docs/architecture/W373-SOTA-READY/REMEDIATION-MANIFEST.md:114`** — F001 required cross-referencing other `b8be62ff` cites, but non-archive active/canonical docs still carry it: `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-A-LAYER-TAXONOMY.md:182`, `STREAM-F-GAP-ANALYSIS.md:247`, and `docs/superpowers/plans/2026-05-21-research-arch-v18-pipeline-foundation.md:506`. Prescription: update active/catalog docs or add explicit `[REFUTED]` errata; leave only clearly historical artifacts unmodified.

7. **`CLAUDE.md:31`** — Root memory still points to `docs/architecture/W333-SOTA-UNLEASH/SKILLS-INVENTORY.md (queued)`, while the manifest records that as a phantom queued doc at `REMEDIATION-MANIFEST.md:45` and `:90`. **This preserves a known dangling cite in the always-loaded file.** Prescription: either land the inventory doc or remove the root-memory pointer before ship.

8. **`docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-CURRENT-W373-DRAFT.md:64`** — The status draft says R6 "HOLD," but the same draft lists F002 as "T5 observability dead" at `:43`, and root `CLAUDE.md:36` still claims live. Prescription: downgrade R6 to violated/partial until the Langfuse claim and residual fabricated-SHA references are corrected.

## Codex r1 rationale (verbatim)

> The strongest case against shipping is not X3 leakage; I found no live `.mcp.json` Composio/agentmemory stanza. The blocker is that the wave-close trail is internally inconsistent: active root memory still contains a known-false Langfuse LIVE claim, P3 remediations are mapped to the wrong finding IDs, several edits crossed the manifest's own HIGH/jury gate, and the closeout artifacts still contain P4/P5 placeholders and unsigned operator acceptance. This is not ready for main.

## Operator decision required

The 8 r1 findings cluster into 4 themes:

1. **CR-6 verify-before-claim violations in CLAUDE.md** (r1-1, r1-7) — Langfuse LIVE + phantom SKILLS-INVENTORY cite in always-loaded file. Each is a cardinal-rule-6 hit. Operator must decide: repair-evidence OR downgrade-cite (both ≤1 commit).
2. **ID-misalignment in VERDICT-LEDGER-DRAFT** (r1-2) — P3 row IDs reference different findings than the manifest defines. Resolution: renumber rows or add an explicit "ledger-vs-manifest ID-map" appendix.
3. **HIGH-gate bypass** (r1-3) — 5-6 HIGH items landed as P3 LOW-auto-fix without jury. Per spec Q2: HIGH items REQUIRE jury. Resolution: retroactive jury sign OR revert-and-defer.
4. **Closeout draft completeness** (r1-4, r1-5, r1-6, r1-8) — VERDICT-LEDGER + OP-SIGN + CLAUDE-MD-DRAFT still have `<pending>` placeholders and unsigned rows; brief count (30) mismatches HIGH count (35) without explicit reconciliation. Resolution: P4 must complete drafts (this gate produces SHIP-GATE-RESULTS.md, which is one of the placeholders — codex correctly noted this circular dependency).

## Recommended next steps

- **Operator triage** of the 8 r1 findings — accept-as-defer / fix-this-session / fix-next-wave
- **If fix-this-session**: 4 sub-stream parallel fix dispatch (one per theme above), then re-run ship-gate (codex r1 round 2)
- **If accept-as-defer**: add explicit DEFER rows in OP-SIGN.md for each r1 finding with rationale, then re-run ship-gate
- **Do NOT cherry-pick fixes auto without re-running ship-gate** — the BLOCK confidence is high (0.93) and r1 specifically identified circular-dependency on P4 artifacts

## Carry-forward

- 4-suite eval lane (inspect_ai + promptfoo + RAGAS + DeepEval): deferred (Anthropic API key + harness setup not in scope this session)
- r2 position-B defender round: deferred until operator triages r1 findings (per BLOCK branch in spec Step 5)

## Artifacts

- Codex r1 dispatch log: `tmp/W373-codex-r1-position-A.txt` (sha256: `5add08757892931b44d3be786c0a8380539006d23419d7b09a08a9f2c651c574`)
- Codex r2 stub (skipped): `tmp/W373-codex-r2-position-B.txt`
- Codex r1 prompt input: `tmp/W373-codex-r1-prompt.txt` (134358 bytes / 845 lines; 7 audit-artifact bundles + CLAUDE.md + diff-stat + commit-list)
- Codex job-state: `Z:/claude-sota-installed/.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-W373-8d4a73f75141d45d/jobs/task-mphdgstf-coipmg.{json,log}`
