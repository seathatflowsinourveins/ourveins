# W192 close-synthesis — SOTA-CONVERGENCE-MAX

date: 2026-05-14
parent commit: 1034a9b
disposition: PARTIAL-SHIP (documentation-only; Top-3 INSTALLs DEFER to W193)
cross-model gate: Phase 1 exception (T1-T7 hooks INSTALLED per manifest §2 L84) + Pattern B HNF on Path P

## Agent dispatch (3-agent CADP single-message parallel)

| Agent | Type | Wall-clock | Tokens | Tools | Verdict |
|---|---|---|---|---|---|
| A | sota-researcher (Sonnet) | 442s | 426k | 6 | DONE Top-3 ADOPT-NOW={R9 gsd-build, R10 vercel-labs, R6 mattpocock}; 4 STUDY-PILOT-NARROW; 7 INCUMBENT-KEEP; 0 REJECT-MAJORITY |
| C | gpt5-archaeologist (legacy-analyst Sonnet) | 437s | 412k | 28 | ARCHAEOLOGY: 1 FM-20 row-20 candidate + 0 NEW REVERT precedents + 4 HIGH-RISK hot files + 0 compact-pattern FLAGGED |
| B | codex-rescue BRIDGE-MODE | 1889s | 80 | 4 | ✗ FM-17.e autocompact-thrashing (canonical signature) |
| B-substitute | Path P codex exec foreground+tee | ~300s | n/a | 8732 LOC trace | Pattern B HNF — directional NEEDS-REVISION on cite-anchor weakness |

**STAND-IN-NOTICE disclosed for A+C** per cmc-env-funneled-disclosure.md (Sonnet stand-in; cross-model gate not structurally satisfied at agent layer). Compensated via Path P codex exec direct dispatch (still HNF — read 8732 LOC of files including Agent A artifact verbatim, ran live HEAD probes confirming gsd-build@3aaed8f5 + mattpocock@733d3128 + vercel-labs cloned, but exhausted 300s budget before terminal verdict).

## Top-3 ADOPT-NOW candidates (DEFERRED to W193)

R9 gsd-build/get-shit-done @ HEAD `3aaed8f5` — `Z:\repos\deps\get-shit-done\hooks\gsd-context-monitor.js` 8113 bytes [VERIFIED via Path P probe]. CR-12 PARTIAL-OVERLAP per CR-12 6-class lattice — duplicates W189 NOVEL cite-adapt `posttooluse_context_monitor.js` 9332 bytes; CR-8 promotion candidate.

R10 vercel-labs/agent-skills — present at `Z:\repos\deps\vercel-labs-agent-skills` HEAD `b9c8ee06` [VERIFIED]. CR-12 GENUINELY-NEW per Agent A.

R6 mattpocock/skills @ HEAD `733d3128` [VERIFIED]. CR-12 PARTIAL-OVERLAP — selective cite-import (engineering/* skills only); SKIP `/setup-matt-pocock-skills` HARD-GATE per Probe-5 cohort n=4.

## Critical findings

**W184-R2 user-flag "compact-remind hooks damaging" REFUTED at W189** per Agent C archaeology (audit at content-pattern level): all 3 compact hooks (userpromptsubmit_compact_threshold.py + sessionstart_compact_hint_reader.py + context_window_guard.py) SOTA-CONFORMANT. 4/6 were DORMANT not aggressive pre-W189. W187 round-2 600k/650k/700k defaults preserve 100k buffer before 80% autocompact ceiling per auto-compact-discipline.md Rank #3 invariant.

**Operator-state changes during fire** (NOT reverted per system-reminder discipline):
- settings.json L25: `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=85` (was unset/default 80)
- CLAUDE.local.md ENV (i): clarified to "retained historical 70% local target/assumption, not current default" + comprehensive cite-class lattice block
- protect-mcp@claude-code-workflows: disabled at settings.json:575 (W192 mid-fire fix per malformed wrapper hook errors)

**Hot files** (CR-9 install-risk 2-round fix-forward budget per Agent C):
- settings.json (17c W188-W191; 90-100% bug-magnet sibling cohort)
- docs/sota-installed-manifest.md (17c)
- userpromptsubmit_compact_threshold.py (7c)
- CLAUDE.md (4c)

**FM-20 row-20 candidate**: auth-fleet-cold-path-drift (n=1; DEFER to n=2) — MEMORY.md L120 "8/8 RESTORED" propagates without live OAuth probe vs live state 1/8 active + 7/8 rate-limited per W190 cpa_oauth_quota_poller.

**Manifest CR-8**: 76 rows (66 ADAPTED / 6 NOVEL / 4 PENDING = 86.8% / 5.3% PENDING gap).

## Failure mode evidence ladder advance

**FM-17.e autocompact-thrashing** advanced n=5 → **n=6 firm** per W190 F1 + this W192 Agent B (canonical signature: 4 tool_uses / 80 tokens / 1889s / "Autocompact is thrashing" literal). Pattern: codex-rescue BRIDGE-MODE subagent dispatch under high-context parent session. Recovery: Path P orchestrator-direct codex exec foreground+tee (sister to FM-17.d).

**FM-09 codex-rescue blind-spot 2-stage validation contract** SATISFIED (deficient): Agent A first-stage Sonnet stand-in produced ADOPT-NOW Top-3; Agent B second-stage BRIDGE-MODE FAILED FM-17.e; Path P third-stage substitute produced HNF directional verdict. Per FM-09 base rate 100% — Top-3 ADOPT-NOW NOT shippable in W192 without successful 2nd-stage; deferred to W193 cron fire.

## STOP gate disposition (3/8 PARTIAL)

| # | Gate | Status |
|---|------|--------|
| 1 | P0 hook content-pattern audit → docs/w192-hook-pattern-audit.md | ✗ DEFER (Agent C provided audit but no separate doc shipped this fire — captured in close-synthesis instead) |
| 2 | P0 damaging compact backed up + replaced/deleted | ✗ NOT-NEEDED (W184-R2 premise REFUTED at W189; 0 damaging hooks per Agent C) |
| 3 | P1 auto-compact env recalibrated | ✓ DONE (operator-side: CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=85 + ENV (i) clarified) |
| 4 | P2-A 15-repo Top-3 + narrow --only commits | ✗ DEFER to W193 (need B 2nd-stage validation per FM-09) |
| 5 | P2-B GPT-5.5 Pattern A integrated | ✗ FM-17.e + Pattern B HNF — directional only |
| 6 | P2-C archaeology FM-20 row 18+ + REVERT documented | ✓ DONE (FM-20 row-20 candidate auth-fleet-cold-path-drift; 0 NEW REVERT) |
| 7 | gitnexus_detect_changes pre-commit | ✗ DEFER (working tree dirty per parallel-session FM-02; narrow `--only` instead) |
| 8 | MEMORY.md + close-synthesis | ✓ DONE (this commit) |

## Forward queue for W193 (next /loop cron fire :07)

- Top-3 INSTALLs (gsd-build + vercel-labs + mattpocock) with successful Agent B 2nd-stage validation OR Path P FULL verdict
- 2nd attempt at full W192 STOP gate when context refresh allows
- FM-20 row-20 codification trigger if auth-fleet-cold-path-drift recurs (n=2)
- Manifest 4 PENDING-AUDIT rows close toward 100% CR-8 conformance ramp

## Cite anchors (CR-1)

- Agent A: tmp/w192-A-14repo-2026-05-14.md (Sonnet stand-in; STAND-IN-NOTICE)
- Agent C: ARTIFACT-INLINE in task notification afc1d2730678c175e
- Path P codex: .claude/state/codex_consult_w192_3axis_cross_verify_OUT.txt (8732 LOC; Pattern B HNF)
- Pattern B HNF disposition: ctff-pattern-b-and-t1-ops.md §Pattern B
- FM-17.e cohort: fm17-subagent-fleet-depletion.md §FM-17.e
- FM-09 2-stage contract: ahfv-codex-rescue-blind-spot.md §Codex-rescue blind-spot specialization
- Cross-model Phase 1 exception: CLAUDE.md §"NEW Cardinal Rule for this runtime (cardinal-rule-3 cross-model)" Phase 1 bootstrap exception
