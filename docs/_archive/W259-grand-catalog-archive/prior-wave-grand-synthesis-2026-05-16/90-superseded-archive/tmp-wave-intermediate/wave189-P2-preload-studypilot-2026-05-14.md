# W189 P2 — Post-Compact Preload Verification + STUDY-PILOT Eval
# Date: 2026-05-14 | Arc: W189 ARCH-SOTA-CLEANUP | orchestrator-direct (codex-rescue FM-17.e n=2)

## 1. 5-backend hash-chain verification (per sessionstart-preload-discipline.md §The contract step 4)

| # | Backend | Probe | Status |
|---|---|---|---|
| 1 | mcp-memory | `mcp__memory__memory_search` "W188 W189 hook audit compact" last-week | **EMPTY — "No memories found"** |
| 2 | graphiti | `mcp__graphiti__get_episodes group_ids=["eee"]` | **EMPTY — "No episodes found"** |
| 3 | provenance | `tail docs/install-provenance.md` | LIVE — W185 entries present, actively written |
| 4 | tmp/ | `ls -t tmp/wave189-*` | LIVE — W189 artifacts persisted (also FM-02: parallel-session `wave189-close-synthesis-2026-05-13.md` + `wave189-final-goal-2026-05-13.md` present) |
| 5 | .claude/state/*.jsonl | row counts | LIVE — gitleaks (2797) / subagent_metrics (2231) / codex_postcommit_reviews (4316) / codex_prepush_reviews (3547) / observations (256) / codex_gate (307) all accumulating |

**P2 FINDING — 2 of 5 backends EMPTY.** `mcp-memory` + `graphiti` return no content. The runtime's
file-based memory (provenance / tmp/ / JSONL) is healthy, but the **MCP memory backends are not
being populated** — cross-session memory persistence via mcp-memory + graphiti is NOT happening.
This is the operator's "your works will not be forgot in different sessions" concern, REAL for
those 2 backends. (CLAUDE.md Memory Stack says graphiti is "WIRED" with FalkorDB at :16379 — but
`get_episodes` returns empty, so either no episodes are being written, or the group_id is wrong,
or the wiring is nominal-but-not-functional.)

**RECOMMENDATION (P2-residual / follow-up fire):** investigate why mcp-memory + graphiti are empty
— (a) confirm the MCP servers are connected (`/mcp` status) per mcp-disconnect-recovery.md D1-D6;
(b) confirm something is actually CALLING `mcp__memory__memory_store` / `mcp__graphiti__add_memory`
on iter/arc close — if nothing writes, nothing persists; (c) the goal MANDATES say "persist ...
MEMORY.md L2 pointer + docs/install-provenance.md row" but do NOT mandate mcp-memory/graphiti
writes — the file-based Layer 1-3 (Karpathy wiki) IS the working persistence layer; the MCP
backends are an ADDITIONAL layer that's currently inert. This needs a dedicated memory-backend
repair fire (out of W189 P2 verification scope — P2 = "verify the 5-backend hash chain," which is
DONE: 3 live, 2 empty).

## 2. HISTORICAL-REFERENCE-ONLY guard

`sessionstart_compact_hint_reader.py` — WIRED at settings.json:483 (SessionStart matcher:"compact").
Verified (grep): L72 has a STALE age-cap (`compact_hint.json - STALE (age > HINT_FRESH_SEC cap)`)
+ L24 references `fm20-path-drift-cascade.md` stale-belief-propagation defense. The hook HAS
stale-DETECTION (age-cap on the compact_hint sidecar). Agent A's P1 compact-chain audit
disposition'd it KEEP-AS-IS (correctly wired, advisory exit-0, reads compact_hint.json +
MEMORY.md head + last-3 close-syntheses + git log). Full literal "HISTORICAL REFERENCE ONLY"
wrapper-string (ECC session-start.js style) is NOT present — the runtime's equivalent is the
age-cap STALE marker + the fm20 cite. ACCEPTABLE — the stale-detection mechanism is live; a
verbatim "HISTORICAL REFERENCE ONLY" string wrapper is an enhancement candidate, not a gap.

## 3. SRA 10-dim STUDY-PILOT verdicts — 3 candidates

Source: Agent A W189 fire-1 research (`tmp/wave189-agentA-sota-research-2026-05-13.md`) + Agent B
convergence analysis. All 3 are single-org → STUDY-PILOT ceiling per convergence-gate Axis-1
(≥3-distinct-org required for ADOPT-NOW). **0 ADOPT-NOW. Cite-adapt only, NO wholesale install.**

### 3.1 gsd-build/get-shit-done `context-management` workflow — STUDY-PILOT
- Distinct from `gsd-context-monitor.js` (already cite-adapted + INSTALLED in P1 f4d92d6 — that was a single HOOK, INSTALL-class per ≥3-org PATTERN convergence). The `context-management` here = the gsd context-save/context-restore WORKFLOW.
- SRA: D1 license MIT ✅ / D4 maintainer TIER-2 (TÂCHES) / D6 use-class — gsd context-save/restore is a manual operator workflow, partial-overlap with the runtime's `/compact` + sessionstart_compact_hint_reader rehydrate.
- Verdict: **STUDY-PILOT** — CR-12 PARTIAL-OVERLAP (different mechanism vs runtime's hint-emitter→reader pair). Cite-pattern-only; no install (the runtime's compact-hint pair + the new posttooluse_context_monitor.js cover the in-session + post-compact surface).

### 3.2 wshobson/agents `context-management` plugin — STUDY-PILOT
- `context-management` plugin: context-save / context-restore commands + context-manager agent (verified local clone, Agent A fire-1).
- SRA: D1 MIT-likely ✅ / D4 single-org (wshobson, TIER-4-NAMED-INDIVIDUAL) / D6 use-class — a manual session-continuity workflow (NOT a compact-hook; no PreCompact/PostToolUse mechanism).
- Verdict: **STUDY-PILOT** — single-org caps at STUDY-PILOT per convergence-gate; CR-12 PARTIAL-OVERLAP with the runtime's sessionstart-preload-discipline + Karpathy 3-layer wiki. Candidate IF the runtime later needs an explicit manual context-save/restore command surface — but the file-based Layer 1-3 already covers cross-session continuity. No install this arc.

### 3.3 alirezarezvani/claude-skills engineering pod — STUDY-PILOT
- 14.7k★ MIT, 263+ skills; engineering pod (~57 skills) flagged ADOPT-NOW by W187 Agent A for the GENERAL skill catalog.
- SRA: D1 MIT ✅ / D4 single-org (alirezarezvani, TIER-4-NAMED-INDIVIDUAL) / D6 — general engineering skills, NOT compact/preload-specific.
- Verdict: **STUDY-PILOT for general skills (per W187)** / **REJECT-FOR-COMPACT-GAP-SPECIFICALLY** — no confirmed context-management/compact/preload skill in the pod. Single-org caps at STUDY-PILOT. For W189 P2's compact/preload scope: not relevant; the general engineering-pod adoption is a separate W187-flagged track.

## VERDICT SUMMARY (P2)
- 5-backend verification: DONE — 3 live, 2 empty (mcp-memory + graphiti) — finding documented, repair = follow-up fire.
- HISTORICAL-REFERENCE guard: live via age-cap STALE-detection (KEEP-AS-IS per Agent A); verbatim-string wrapper is an enhancement candidate not a gap.
- 3 STUDY-PILOT verdicts SHIPPED: gsd context-management (STUDY-PILOT / PARTIAL-OVERLAP), wshobson context-management (STUDY-PILOT / PARTIAL-OVERLAP), alirezarezvani engineering pod (STUDY-PILOT-general / REJECT-for-compact-gap). **0 ADOPT-NOW — cite-adapt only, no wholesale install this arc** (matches the goal P2 framing exactly).
- Cross-model T1 on these verdicts: orchestrator-direct codex T1 — see codex_consult_w189_p2_*.
