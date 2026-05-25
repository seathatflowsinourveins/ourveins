# W309 commit provenance + parallel-session race condition record

**Wave**: W309  
**Date**: 2026-05-19  
**Purpose**: cross-reference the W309 ship to its actual commit (which carries a misleading message) and record a governance lesson for sca-v6 Δ2 absorption.

## What happened

The W309 ship was authored across this session:

1. **HEAD@{6} `31e4ad7`** — W309 wave-start commit (W309-PLAN.md alone). Authored by THIS session.
2. **HEAD@{5..1}** — 5 intervening commits (W302 wave-residue + W308 codex-r1 close-outs + W308 EXECUTE-AND-ROTATE ship). Authored by a PARALLEL CC session operating on the same `sota-converge-w295` branch — violates W280d parallel-session safety mandate (worktree-per-session rule).
3. **HEAD@{0} `edddf94`** — committed the W309 staged work (`W309-STREAM-A/B/C/D-*.md` + `W309-SYNTHESIS.md` + ledger rows 32-36 + settings.json:263 PWF flip true→false) BUT under a misleading commit message claiming "ship(W302-close-out): VERDICT-LEDGER rows 26-29 + cognee smoke ratification + T6 verdicts written".

The actual diff stat of `edddf94` is:
```
 .claude/settings.json                              |   2 +-
 .../W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md        |  14 +
 .../W309-STREAM-A-SILENT-FALLBACK-HUNT.md          | 452 +++++++++++++
 .../W309-STREAM-B-SCA-V6-DESIGN.md                 | 699 +++++++++++++++++++++
 .../W309-STREAM-C-NAMED-REPO-DEEP-DIVES.md         | 639 +++++++++++++++++++
 .../W309-STREAM-D-MULTI-ANGLE-DISCOVERY.md         | 415 ++++++++++++
 .../W309-SYNTHESIS.md                              | 259 ++++++++
 7 files changed, 2479 insertions(+), 1 deletion(-)
```

This is the EXACT staged set this W309 session prepared — the commit content is correct; only the message is wrong.

## Correct W309 ship narrative (the message that SHOULD have been recorded for `edddf94`)

```
ship(W309): research-arch audit + silent-fallback hunt + sca-v6 design + multi-angle SOTA convergence — 4-stream parallel ship

4 parallel-Agent streams converged + synthesis + 5 verdict-ledger rows + AI-9 PWF closure.

Stream A — Silent-fallback hunt: 3 CRITICAL + 5 HIGH + 8 MED + 4 LOW + CLEAN-verified set. Operator agent-team intuition validated: plumbing CLEAN; silent fallbacks live ONE LAYER DOWN in phoenix/langfuse/cognee MCPs.

Stream B — sca-v6 design: 9 deltas (Δ1 LIVE STATE PROBE + Δ2 re_enable_phase5_gate + Δ3 D22 cascade-breadth + Δ4 D23 decision-impact-tier + Δ5 cascade tier-floor + Δ6 self-eval cadence + Δ7 Borda + Δ8 deepwiki+repomix mandatory + Δ9 perplexity-equiv mandatory). Architecture-itself install_score 4.545→4.72 preview (T1 INSTALL holds).

Stream C — 5 named-repo verdicts ratified (rows 32-36):
  - planning-with-files T3 PATTERN-STUDY DEACTIVATE
  - GitNexus T3
  - wshobson/agents T4
  - mattpocock/skills T2 (overturns W301 stale-metadata via live LICENSE re-fetch — first concrete sca-v6 Δ1 catch)
  - anthropics/* T0 TRIAGE (64 catalogued, 3 W310-queued)

Stream D — 25 NET-NEW candidates across 5 axes via 6-MCP-family cascade ($0.90 of $1.50 cap). Anti-bias quotas all exceeded 4-7x. Top-5 W310 shortlist: princeton-pli/hal-harness · open-multi-agent/open-multi-agent · cenkerinan/awesome-agent-skills · scaleapi/researchrubrics · Mathews-Tom/armory. 5 new R-mandates (R13-R17) forwarded to sca-v6.

AI-9 PWF closure applied: settings.json:263 — planning-with-files@planning-with-files: true → false per W308 row #31 default-deactivate-at-W310 pre-approved trigger.

Phase-5 4-FAIL/1-PASS evidence (W309 Stream C strict-letter re-run confirms W308 STREAM B):
- Gate-1 (provenance re-fetch): PASS
- Gate-2 (paraphrase-invariance): FAIL
- Gate-3 (adversarial-blinded with declared bias-class): FAIL — star-anchor bias detected; hard-cap class fires forcing tier <= T3
- Gate-4 (contamination check): FAIL — 4-cite-chain to single OthmanAdi author
- Gate-5 (replayable + >=3-org-effective diversity): FAIL — 9 downstream practitioner-forks = community-amplification not independent attestation

Ship-blockers surfaced (operator-action):
- AI-1 phoenix :16006 DOWN (silent fetch-fail; CLAUDE.md status drift)
- AI-2 OTel auth header missing → langfuse 401 silent (total observability data-loss today)
- AI-3 cognee MCP JSON-RPC session protocol broken (CLAUDE.md status drift)
```

## Governance lesson for sca-v6 Δ2

W309's "PWF re-litigation closure" is exactly the class of edit W308 row #31 flagged as needing a `re_enable_phase5_gate` governance check. The silent-drift loophole the W308 lesson warned about was:

> *W296 `2bf2d27` silent re-enable = separate governance failure (commit msg zero Phase-5 mention).*

W309 `edddf94` is a NEW INSTANCE of the same class:

> The PWF settings.json:263 flip true→false was committed with a message that contains ZERO mention of "W309", "Phase-5", "PWF", or "planning-with-files".

Per Stream B Δ2 design — when sca-v6 ships in W310, the `re_enable_phase5_gate` mandate's pre-commit blocker rule should ALSO catch the **DEACTIVATE-without-mention** symmetric case. The blocker rule should fire on ANY `enabledPlugins[<slug>]` value change (true→false OR false→true) where the commit message lacks the Phase-5 token + slug citation.

**Δ2 amendment proposal for sca-v6 ship**: extend the rule from "flip false→true requires Phase-5 token" to "ANY value change on a `CONDITIONAL-RATIFY` / `PARTIAL-COMPLY` / `T3 PATTERN-STUDY DEACTIVATE` / `T5 REJECT` ledger row's plugin requires Phase-5 token + slug citation + ledger-row cross-reference".

## Parallel-session race condition lesson for CLAUDE.md W280d

W280d's mandate is *"NEVER bare-resume the same session-id in 2 terminals"*. The race condition this W309 session experienced suggests an additional rule:

**Proposed W309-amendment to W280d**: when 2+ CC sessions operate on the same git branch concurrently (even via different session-ids), the LAST writer wins on commit message → the actual ship can land under an attribution-mistaken commit message. The mitigation is:
- ONE git worktree per session (existing rule, preserved)
- ONE branch per worktree (existing rule, preserved)
- **NEW**: if a synthesis session expects to ship to a branch already in use by another active session, the synthesis session should `git checkout -b sota-converge-w309` (new branch) before ship + later operator-merge

This W309 wave will NOT branch-rename (the ship is already in `edddf94` on `sota-converge-w295`); the lesson is forward-only for W310+.

## Status verification

The W309 ship is intact:
- All 6 W309 .md files committed: `git log --all -- 'docs/architecture/W309-*'` shows `edddf94` + `31e4ad7`
- PWF flip applied: `grep planning-with-files .claude/settings.json` shows `false`
- Ledger row 32 in place: `grep '^| 32 ' docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` returns the W309 PWF closure row
- 5 new ledger rows (32-36) + W309 tier-distribution + 5 W309 mandate validations all present

The W309 wave is FUNCTIONALLY COMPLETE. The commit message is the only artefact that doesn't reflect the actual content.
