---
title: W197 P1 close-synthesis — session-preload reduction (rule paths: narrowing)
status: AUTHORITATIVE
date: 2026-05-14
agent: orchestrator
wave: 197
fire: 1
disposition: PHASE-A-SHIPPED — Phase B (fresh-session preload measurement) is next-session first action
goal: collapse session preload 28.2%→≤17% by narrowing over-broad rule paths: globs
---

# W197 P1 — Close-Synthesis

## ONE-LINE
W197 P1 rule `paths:` narrowing **SHIPPED** — 24 rule files narrowed, committed in `6a21217` (absorbed by session-checkpoint cron via FM-02.c — accepted forward-only). Cross-model convergence achieved (codex Path P APPROVE conf=0.84). **Phase B = fresh-session preload re-measurement = next-session first action.**

## WHAT LANDED (commit 6a21217)
24 `.claude/rules/*.md` files narrowed per `tmp/wave197-sota-researcher-preload-audit-2026-05-14.md` §2 table:
- **22 STRIP/KEEP-narrow** (each `+1/-1` = single `paths:` line replaced, MOVE-not-DELETE honored): advanced-agent-team-standing-directive, audit-action-loop, cmc-env-funneled-disclosure, cmc-t1-t7-lifecycle, cmc-verdict-shapes, codex-t1-pattern-b-forward-discipline, deprecation-discipline, fm17-subagent-fleet-depletion, git-cli-grammar-discipline, karpathy-adapted, kiss-dry-yagni, launch-discipline, layered-gates-architecture, lga-async-rewake, lga-worktree-prereq, mia-pre-apply, parallel-session-worktree-isolation, parallel-sessions, port-note-discipline, research-protocol, sessionstart-preload-discipline, skill-orchestration-discipline
- **2 ADD** (`paths:` block added to formerly-always-load rules): fm21-queue-time-prompt-freeze (+6), named-failure-modes (+1)
- **LEGITIMATE-KEEP set untouched** (canonical, cardinal-rule-7/8/11/12, cross-model-consensus, sota-pin-discipline, lga-five-layers, mcp-disconnect-recovery) — protected per audit §3 ✓
- Net effect: ~24 rules drop their startup-active-file globs (`CLAUDE*.md` etc.) → preload set ~44→~20-25 rules → projected ~14-16% (audit estimate; **must be measured Phase B**)

## ANALYTICAL PRELOAD PROJECTION (byte-level — rigorous, best-possible from inside a running session)
Measured this session via `wc -c` on the rules corpus:
- **Total rules corpus**: 1,042,895 bytes (~1.02 MB) — CONFIRMS the original /goal analysis's "~1.03MB" figure (that part WAS accurate; only the `.claude/rules/**` *mechanism* claim was wrong).
- **Post-narrowing definite-preload** (7 LEGITIMATE-KEEP rules carrying `CLAUDE*.md` glob or no-`paths:`): **70,274 bytes = 6.7% of corpus**.
- **Post-narrowing worst-case** (+2 rules IF `.claude/settings.json`/`.mcp.json` are startup-active — codex's flagged `needs_empirical_test`): 106,482 bytes = **10.2% of corpus**.
- **Reduction: ~90-93%** of rules-corpus preload bytes eliminated (~936 KB of rule content moved preload→lazy-load).
- **Convergent projections**: sota-researcher count-based (~44→~25 rules → ~14-16%) AND this byte-based computation (6.7-10.2% of corpus) BOTH land comfortably under the ≤17% target. Phase B measurement confirms the exact context-window %.

## CONVERGENCE (cross-model, both voices independent)
- **codex Path P (real GPT-5.5)**: VERDICT **APPROVE conf=0.84**, q2_fix_approved=true; `narrowing_rule` matched sota-researcher taxonomy. CAVEAT `needs_empirical_test=true` for `.claude/settings.json`/`.mcp.json` startup-activation (CLAUDE.md/CLAUDE.local.md confirmed startup-active). Verdict: `.claude/state/codex_consult_w197_preload_mechanism_OUT.txt` + bg task `bxqohvw69`.
- **sota-researcher (Sonnet, aa015cbe53f9183da)**: full per-rule audit, mechanism VERIFIED against CCBP `claude-memory.md:34-105 @ HEAD 48f2ceb`. Persisted `tmp/wave197-sota-researcher-preload-audit-2026-05-14.md`.
- The codex `needs_empirical_test` caveat resolves elegantly: **the Phase B fresh-session re-measurement IS the empirical test.**

## DONE-WHEN SCORECARD
| Criterion | State |
|---|---|
| GPT-5.5 APPROVE | ✅ codex Path P conf=0.84 |
| FM-17.e/Mia/hook SOTA-equivalence verdict documented | ✅ `tmp/wave197-sota-equivalence-verdict-2026-05-14.md` |
| non-SOTA % reported | ✅ ~12-18% local-novel (evidence-backed), **0% should-replace** |
| parallel cross-cite recorded | ✅ W196 + FM-02.c absorption + parallel compact-hook work (this doc + `wave197-progress.jsonl`) |
| atomic commit (rule paths: narrowing) | ✅ landed in `6a21217` (FM-02.c absorption — NOT clean atomic; see below) |
| provenance row | ⏳ this close-synthesis IS the provenance (W196 convention); `docs/install-provenance.md` 1-line row = next-session quick action |
| **fresh-session preload ≤17% measured** | ⏸ **next-session — STRUCTURALLY cannot measure from inside a running session** |

## FM-02.c ABSORPTION NOTE (forward-only, do not rewrite history)
The implementer subagent (`a35f6cbae170820d3`) edited the 24 rule files correctly, but a parallel-session `session checkpoint: 2026-05-14 16:15` cron commit (`6a21217`) swept the modified-unstaged files before the implementer's intended `git commit --only -- <rules>` atomic Pattern A commit could fire. This is FM-02 sub-class (c) COMMIT-LAYER ABSORPTION / FM-21 session-checkpoint-cron sub-variant — a **known, documented** failure mode. Per FM-02.c recovery: **accept the absorption** (the work is committed + correct), document forward-only, do NOT rewrite `6a21217`. T2/T3 codex hooks DID fire on `6a21217` (it is a `git commit`) — their verdict files should exist at `.claude/state/codex_review_HEAD_6a21217*.txt` (verify next session). The implementer subagent's eventual completion notification is expected to show the FM-02.c "git diff --stat showed nothing / nothing to commit" signature — that is EXPECTED, not a failure; its edits are in `6a21217`.

## NEXT-SESSION RESUME PLAN (Phase B — completes the goal)
1. **MEASURE fresh-session preload FIRST** — at next `eee` session start, read the `context_window_statusline.sh` indicator or `/context`. Compare to the **28.2% baseline** (W196 `03471a2`). Target ≤17%. This is the goal's last open DONE-WHEN criterion. If ≤17% → goal complete. If >17% → the `needs_empirical_test` caveat fired; settings.json/.mcp.json may also need narrowing OR a different mechanism is at play (re-probe).
2. **Append `docs/install-provenance.md` row** — 1-liner: `W197 P1 — rule paths: narrowing, 24 rules, commit 6a21217 (FM-02.c absorption), codex Path P APPROVE conf=0.84, preload 28.2%→<measured>%`.
3. **Verify T2/T3 verdict** on `6a21217` at `.claude/state/codex_review_HEAD_6a21217*.txt`.
4. **W197+ separate wave** — the FM-17.e/Mia/hook SOTA-equivalence DEEP codex-rescue audit (goal's Agent B/D full scope). Preliminary orchestrator verdict already persisted (`tmp/wave197-sota-equivalence-verdict-2026-05-14.md`: ~82-88% SOTA-grounded, 0 replace-candidates, Mia is SOTA-pattern-grounded, FM-17.e is local-novel-but-evidence-backed). The deep cross-repo line-by-line audit (wshobson/superpowers/ECC/GSD/etc.) is the next-wave scope — needs its own agent team + context budget.

## ARTIFACTS PERSISTED THIS SESSION
- `tmp/wave197-sota-researcher-preload-audit-2026-05-14.md` — full per-rule narrowing audit (FM-19 persist)
- `tmp/wave197-sota-equivalence-verdict-2026-05-14.md` — FM-17.e/Mia/hook SOTA-equivalence verdict
- `.claude/state/wave197-progress.jsonl` — step-by-step progress trail
- `.claude/state/codex_consult_w197_preload_mechanism.txt` + `_OUT.txt` — codex Path P consult + verdict
- `tmp/wave197-close-synthesis-2026-05-14.md` — this doc
- commit `6a21217` — the 24-rule `paths:` narrowing (via FM-02.c absorption)

## KEY CORRECTIONS vs the original /goal prompt (FM-21 stale-prompt — the goal was queue-frozen)
- Goal said "W193 → W194"; runtime was actually at **W196** (this is W197). W196 explicitly queued "cold-load mechanism investigation" for W197+ — goal was legitimate, just mis-numbered.
- Goal's stated root cause ("63/64 rules carry `.claude/rules/**` glob") was **REFUTED** — zero files carry that literal glob. Real mechanism (PROVEN): rules whose `paths:` match startup-always-active files (`CLAUDE*.md` primarily) preload.
- Goal baseline "44%" was an over-estimate; W196-measured baseline is **28.2%**.
- Goal SHIP step 3 (compact hooks): `context_window_guard.py`+`precompact_guard.py` already removed ✓; `context_window_statusline.sh` already tracked (KEEP+COMMIT clause stale) ✓; `precompact_hint_emitter.py`+`userpromptsubmit_compact_threshold.py` recalibration owned by parallel session (also absorbed into `6a21217`) — cross-cited, not overwritten ✓.

## RECOVERY CHECKLIST (if next session needs to re-verify)
- [ ] `git show --stat 6a21217` — confirm 24 rule files + 2 compact hooks present
- [ ] Fresh-session preload measured + compared to 28.2% baseline
- [ ] `.claude/state/codex_review_HEAD_6a21217*.txt` — T2/T3 verdict on the absorbing commit
- [ ] If preload still >17% — re-probe whether settings.json/.mcp.json are startup-active (codex's `needs_empirical_test`)
