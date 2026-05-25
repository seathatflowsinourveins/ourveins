---
title: W195 Agent A — Decision-Layer Primitive SOTA-Equivalent Research
status: DETAIL
date: 2026-05-14
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (f))
---

# W195 Agent A — Decision-Layer Primitive SOTA-Equivalent Research

**STAND-IN-NOTICE**: ran under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` stand-in per `CLAUDE.local.md` ENV block (f). Cross-model gate NOT structurally satisfied — orchestrator MUST file 2nd-stage validation (FM-09 2-stage contract) before acting on SOTA-CITE-UPGRADE verdicts.

**Scope**: drill into 5 decision-layer PRIMITIVES, find SOTA equivalent per surface across 14 cite-source repos. Builds on prior W195-A 16-repo Probe-DAG at `tmp/w195-A-sota-research-2026-05-14.md`.

**HEAD SHAs verified** (cardinal-rule-1 cite-anchor pinning, 2026-05-14):
- superpowers `f2cbfbefebbfef77321e4c9abc9e949826bea9d7`
- wshobson-agents `ece811f23310a37ceb43496dbac0e244fe6845b6`
- everything-claude-code `841beea45cb25ba51f29fa45b7e272938d19b80a`
- gstack `06605477e25bf9b302888465baec132fa6093f39`
- andrej-karpathy-skills `2c606141936f1eeef17fa3043a72095b4765b9c2`
- mattpocock-skills `733d312884b3878a9a9cff693c5886943753a741`
- awesome-agentic-patterns `9c40e10042254ab896fed6953267b119711bae40`
- anthropic-cookbook `33424c3eb476cd56379435be086ccc228af1050d`
- addy-agent-skills (marketplace) `3ff4b518b3cd3077ca27cf883aa21d21faf53802`
- claude-code-skills (marketplace = alirezarezvani) `f776236fb9228892841cf36b5e64087c9b9af9bb`
- claude-code-best-practice-shan `f8468e871ed372f2807aa9d3ca7ca91eca7db422`

**HONEST-NON-FINDING**: 5 of 14 named repos NOT present at brief-assumed `Z:/repos/deps/<name>` paths — `addy-agent-skills` (at marketplace + `Z:/repos/deps/addyosmani-agent-skills@4c585c37`), `alirezarezvani/claude-skills` (at marketplace `claude-code-skills/`), `shareAI-lab/learn-claude-code` (NOT FOUND), `ComposioHQ/awesome-claude-skills` (NOT FOUND — `Z:/repos/deps/composio` is a different repo), `hesreallyhim/awesome-claude-code` (NOT FOUND). gstack `get-shit-done` separate-path verify dir also NOT FOUND — gstack verify discipline is inline in `codex/SKILL.md` Step 2A/2B.

---

## VERDICT TABLE

| # | Surface | Verdict | SOTA structural parent (cite) | sss-novel layer retained |
|---|---|---|---|---|
| 1 | FM-17.e autocompact-thrashing | SIBLING-NOVEL-RETAIN | (recovery only) gstack codex exit-124 handler `SKILL.md:924-931 @ 06605477` | Failure-mode naming + diagnostic discriminator + n=5 ladder — no SOTA equivalent for the sub-class |
| 2 | Mia pre-apply | SOTA-CITE-UPGRADE | superpowers verification-before-completion Iron Law + Gate Function `SKILL.md:16-35 @ f2cbfbef` | Pre-edit/agent-prescription specialization + probe-by-subclaim-type + multi-channel install-probe + bidirectional framing + n=29 ladder |
| 3 | FM-09 2-stage validation | SOTA-CITE-UPGRADE | superpowers subagent-driven-development spec-reviewer "DO NOT trust the report" `spec-reviewer-prompt.md:23-35 @ f2cbfbef` | Agent-architecture-blind-spot diagnosis + Probe-4/5/6-skip + n=5/5 100% base-rate + parallel-not-serial anti-pattern |
| 4 | Path-P codex exec foreground+tee | SOTA-CITE-UPGRADE | (topology) CCBP cross-model-workflow `:1-48 @ f8468e87` + (operational) gstack codex timeout-wrapper `SKILL.md:920-931 @ 06605477` | `--skip-git-repo-check --color never` flag-set + wrapper-bypass-recovery framing + DEFAULT-profile selection |
| 5 | CADP cache-aware dispatch pacing | SIBLING-NOVEL-RETAIN | (generic cap) lane-based-execution-queueing `:1-50 @ 9c40e100` | Cache-rate gate + credential-depletion motivation + status.py-probe discipline + cache-locality sticky-binding — no SOTA cache-economics equivalent |

**NET: 2 SIBLING-NOVEL-RETAIN (FM-17.e, CADP) + 3 SOTA-CITE-UPGRADE (Mia, FM-09, Path-P). Zero REPLACE-WITH-X** — no SOTA pattern strictly dominates an sss decision-layer primitive. The 3 upgrades are cite-anchor precision/addition fixes, not pattern replacements.

## TOP-3 SOTA-CITE-UPGRADE RECOMMENDATIONS (orchestrator MUST FM-09 2nd-stage-validate before applying)

1. **Mia pre-apply** — In `mia-pre-apply.md`, tighten existing superpowers cite-anchor from `verification-before-completion/SKILL.md:1-20 @ e7a2d164` (overview, OLD HEAD) to `:16-35 @ f2cbfbefebbfef77321e4c9abc9e949826bea9d7` (Iron Law + 5-step Gate Function). Corrects line-range AND stale HEAD SHA. `constituents=[TIER-1-DIRECT @ superpowers/skills/verification-before-completion/SKILL.md:16-35 @ f2cbfbef, TIER-3-LOCAL-COMPOSITION @ Mia pre-edit/agent-prescription/runtime-probe specialization]; effective_tier=TIER-3-LOCAL-COMPOSITION`.

2. **FM-09 2-stage validation** — In `ahfv-codex-rescue-blind-spot.md`, ADD a TIER-1-DIRECT cite-anchor (currently MISSING) to `Z:/repos/deps/superpowers/skills/subagent-driven-development/spec-reviewer-prompt.md:23-35 @ f2cbfbefebbfef77321e4c9abc9e949826bea9d7` as the SOTA structural parent for the 2-stage "DO NOT trust the report" discipline. Closes convergence-gate Axis-1 cite gap.

3. **Path-P codex exec** — In `ctff-patterns-cd.md` (Pattern D), ADD a TIER-1-DIRECT cite-anchor to `Z:/repos/deps/gstack/codex/SKILL.md:920-931 @ 06605477e25bf9b302888465baec132fa6093f39` as operational structural parent for the `codex exec` timeout-wrapper + foreground-tee + exit-124-handling mechanics. Optional bonus: adopt gstack's filesystem-boundary prompt-prefix discipline (`SKILL.md:903-905`).

## CONVERGENCE-GATE SUMMARY (per surface)

| Surface | Axis-1 (≥3 T1 orgs) | Axis-2 (≥2 named-T2) | Axis-3 (≥3mo stable) | Net |
|---|---|---|---|---|
| 1 FM-17.e | FAIL (0 sources for the sub-class) | FAIL | N/A | SIBLING-NOVEL |
| 2 Mia | PASS (superpowers + Karpathy + addyosmani) | PASS (obra + Osmani + Karpathy) | PASS | ROOT SOTA-converged; 5 novel layers |
| 3 FM-09 | PARTIAL (superpowers 1 firm; need 2nd 2-stage-temporal org) | PARTIAL (obra) | PASS | 2-stage SHAPE SOTA; diagnosis novel |
| 4 Path-P | PASS (CCBP + gstack + CC `codex exec`) | PASS (Garry Tan + shanraisshan) | PASS | topology+ops SOTA; flag-set novel |
| 5 CADP | PASS for generic cap (lane-queueing + parallel-tool + swarm-migration) | PASS (Balic + Cherny) | PASS | generic cap SOTA; cache-economics novel |

## Per-surface detail

### Surface 1 — FM-17.e CC-runtime autocompact-thrashing → SIBLING-NOVEL-RETAIN
Our pattern (`fm17-subagent-fleet-depletion.md:97-98`): CC-runtime autocompact thrash-cycle; after 3 cycles CC self-aborts ("Autocompact is thrashing" + 4 tool_uses / 146-164 tokens / ~989-1180s). gstack codex exit-124 handler (`SKILL.md:924-931 @ 06605477`) covers codex-CLI subprocess stall (= FM-17.d) NOT CC-runtime autocompact. anthropic-cookbook agent-resilience: NOT FOUND. Axis-1 FAIL (0 T1 sources for sub-class). CR-12: GENUINELY-NEW. Recovery (Path P bypass) shared with FM-17.d. Recovery sub-section should cross-link gstack exit-124 as structural analog.

### Surface 2 — Mia pre-apply → SOTA-CITE-UPGRADE
Our pattern (`mia-pre-apply.md`, 206 LOC): verify agent prescribed_edits vs runtime state BEFORE Edit; decompose → cheapest probe per sub-claim → drop refuted as OVER → apply verified in single atomic Pattern A commit. Root = superpowers verification-before-completion Iron Law + 5-step Gate Function (`SKILL.md:16-35 @ f2cbfbef`). Already cited but at `:1-20` (overview) at OLD HEAD `e7a2d164`. 5 sss-novel layers correctly disclosed. Axis-1 PASS (superpowers + Karpathy + addyosmani). CR-12: PARTIAL-OVERLAP — superpowers verifies at completion-claim time; Mia at prescription-receipt time. Co-exist.

### Surface 3 — FM-09 codex-rescue blind-spot 2-stage validation → SOTA-CITE-UPGRADE
Our pattern (`ahfv-codex-rescue-blind-spot.md`, 86 LOC): codex-rescue returns ADOPT-NOW WITHOUT Probe 4/5/6; 2-stage contract spawns 2nd-stage harness-fit agent that OVERRIDES. n=5/5 100% base rate. Root = superpowers spec-reviewer "DO NOT trust the report" (`spec-reviewer-prompt.md:23-35 @ f2cbfbef`). Rule currently has NO TIER-1-DIRECT cite for core 2-stage mechanic — Axis-1 cite gap. CR-12: PARTIAL-OVERLAP. Agent-architecture-blind-spot diagnosis + Probe-4/5/6-skip + n=5/5 + parallel-not-serial anti-pattern are sss-novel.

### Surface 4 — Path-P codex exec foreground+tee → SOTA-CITE-UPGRADE
Our pattern (`cmc-t1-t7-lifecycle.md` + ctff Pattern D): orchestrator-direct `codex exec --skip-git-repo-check --color never` DEFAULT profile, 300s, foreground+tee. Topology = CCBP cross-model-workflow `:1-48 @ f8468e87` (already cardinal-rule-3 anchor). Operational twin = gstack codex timeout-wrapper `SKILL.md:920-931 @ 06605477` (`codex review ... < /dev/null` + `timeout: 300000` + exit-124 handler + filesystem-boundary prompt prefix) — Pattern D does NOT cite this. Axis-1 PASS. CR-12: PARTIAL-OVERLAP / PROVIDER-COMPLEMENT. `--skip-git-repo-check --color never` flag-set + wrapper-bypass-recovery framing are sss-novel.

### Surface 5 — CADP cache-aware dispatch pacing → SIBLING-NOVEL-RETAIN
Our pattern (`parallel-agent-wave.md §Cache-Aware Dispatch Pacing`): max-3 concurrent / max-35 tool calls / max-5 cumulative without status.py probe / cache-rate gate. Generic concurrency-cap IS SOTA (lane-based-execution-queueing + parallel-tool-execution + swarm-migration `@ 9c40e100`, already cited). BUT all 3 SOTA caps motivated by throughput/interleaving/deadlock; NONE by prompt-cache-hit-rate + API-credential-pool-depletion. Axis-1 PASS for generic cap. CR-12: PARTIAL-OVERLAP. CADP cache-economics layer (cache-rate gate + credential-depletion motivation + status.py-probe discipline + cache-locality sticky-binding cites arXiv 2601.06007) has NO SOTA equivalent. RETAIN.
