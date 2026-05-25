---
title: "Wave 252 Research Wave — Index"
date: 2026-05-16
wave: 252
status: GRAND-SYNTHESIS-COMPLETE (2 gates open before install execution)
---

# Wave 252 — Fresh Research Wave + Grand Synthesis

Continuation of `research-wave-2026-05-15/01-fresh-research-wave-2026-05-16/` (W251). W252 closes the W251 `NEEDS-REVISION-BEFORE-INSTALL` verdict's 6 P0 license blockers and produces an executable two-tier install architecture for a pure SOTA Claude Code runtime (`Z:/claude-sota-pure`).

## Artifacts (read in this order)

| File | Purpose |
|---|---|
| **`W252-GRAND-SYNTHESIS-2026-05-16.md`** | **START HERE** — two-tier catalog (Tier-A 21-repo install spine / Tier-B pilot) + 11-layer ultimate runtime architecture + GPT-5.5 T1-T7 adversarial integration + 8-phase install checklist |
| `scoring/A-multi-dimensional-scoring-2026-05-16.md` | 10-dimension scoring matrix, 55+ repos by category; INSTALL-TIER-A roster (composite ≥78) |
| `scoring/B-license-resolution-2026-05-16.md` | License resolution for 10 NOASSERTION/probe-needed repos — 8 PASS, 1 AMBER (Commons Clause), 1 pending |
| `agent-reports/B-fresh-discovery-tokeneff-2026-05-16.md` | Fresh May-2026 discovery + token-efficiency SOTA reset (LLMLingua REJECTED → interception+caching+retrieval stack) |
| `agent-reports/C-narrow-P0-blockers-2026-05-16.md` | 6 P0 license blocker verdicts (context-mode ELv2, FalkorDB SSPL, OpenViking AGPL, protect-mcp, trailofbits, litellm) |

## Method disclosure

W252 dispatched 3 parallel research subagents (Track A scoring / Track B fresh-discovery / Track C disputed-repos). **3 of 4 dispatches lost to FM-17** (Track A FM-17.b final-return-loss, Track B FM-17.d autocompact-thrash, Track C FM-17.b — only the tightly-bounded C-narrow re-dispatch survived). Synthesis is therefore **orchestrator-direct**: 40 repos fresh-probed via `mcp__github__search_repositories` 2026-05-16 + 10 LICENSE files probed at HEAD + W251 carryover.

**GPT-5.5 cross-model review DID run** — orchestrator-direct `codex exec -p deep-review` (Path P, codex CLI 0.130.0) timed out at 280s in active-deep-research mode → Pattern B trace-mine. Codex caught 1 material over-claim (rtk Tier-A → PILOT — see W252-GRAND-SYNTHESIS §7). Gate is **PARTIALLY satisfied**: 1 catch applied, but the two-tier split / T1-T7 design / FalkorDB-SSPL analysis were not independently verified before timeout.

## Verdict

`EXECUTABLE-WITH-2-GATES` (+ 1 codex T1 fix-forward applied):
1. **Gate 1** — repair BRIDGE-MODE codex app-server ACL (FM-17.d) for a complete bounded codex T1 pass (single-question-per-call, 90-120s) on the claims codex did not reach.
2. **Gate 2** — `anthropics/skills` LICENSE re-probe (LICENSE not at root); other 9 license probes resolved (8 PASS, 1 AMBER).

Once both gates clear, the W252-GRAND-SYNTHESIS §4 8-phase checklist is directly executable for `Z:/claude-sota-pure`.

## Key outcomes

- **6 W251 P0 blockers resolved** — context-mode is ELv2 (W250 MIT claim REFUTED); OpenViking AGPL permanent-REJECT; FalkorDB SSPL AMBER-local-OK; protect-mcp/trailofbits CITE-or-BLOCK; litellm MIT-core PASS.
- **21 INSTALL-TIER-A repos** identified — the install spine; current `claude-sota-installed` runtime already has ~15 wired.
- **Token SOTA reset** — LLMLingua family REJECTED (lossy, superseded); SOTA = native caching + rtk interception + repomix packing + headroom compression + claude-context retrieval + ccusage observability.
- **rtk-ai/rtk** — license PASS (Apache-2.0 root) but **DOWNGRADED Tier-A→INSTALL-PILOT** by codex T1 review (issue #582: ~18% token cost INCREASE in some configs; measure net savings before keeping).
- **Star-inflation hazard** — 2026-05 CC ecosystem has meme repos at 100K-190K★; star count is no longer a quality signal — source-audit mandatory regardless of ★.
