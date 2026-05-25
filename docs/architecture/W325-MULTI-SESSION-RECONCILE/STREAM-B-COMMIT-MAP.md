# W325 Stream B — Commit-by-Commit Attribution Map

**Date**: 2026-05-19
**Owner**: W325 Stream B
**Scope**: Linear-history commit map between `aee7240` (my W319-codex-r4) and `1360aeb` (my W320-codex-r2 HEAD), distinguishing **MINE** vs **PARALLEL-SESSION** authorship.
**Methodology**: `git log --format='%H %ai %s' aee7240..1360aeb` + commit-message parsing + file-stat correlation against W321/W322/W323/W324 wave-dirs.

---

## §1 Linear history (4 commits, 2026-05-19 13:39 → 13:49 EDT, ~10 min span)

| # | SHA | Time (EDT) | Subject | Session | Wave-dir created |
|---|---|---|---|---|---|
| 1 | `8e43c24` | 13:39:58 | ship(W324): META-FOUNDATION P0-P8 applied per codex-r11-APPROVE | **PARALLEL** | `W324-WAVE/` (CLOSURE-SYNTHESIS + P4 + P8) — also bundled 5 W320-B-MULTI-REPO-INGEST artifacts per commit-msg footer |
| 2 | `5cac3ec` | 13:42:04 | ship(W320): W319-forward-queue execution wave — 4-stream parallel sweep | **MINE** (W320-A/B/C/D + W320-AUDIT-WAVE + W320-CLOSURE-SYNTHESIS) | `W320-AUDIT-WAVE/`, `W320-CLOSURE-SYNTHESIS/`, `W320-P0-CLOSURES/`, `W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/`, `W320-RUNTIME-FIXES/`, `W320-VENDOR-FORK-AND-CITE/`, `W320-WAVE/` |
| 3 | `e626cec` | 13:47:05 | ship(W320-codex-r1): multi-session provenance correction — settings.json claims | **MINE** (codex r1 correction on top of `5cac3ec`) | (no new dir; CLAUDE.md status + settings.json edits) |
| 4 | `1360aeb` | 13:49:58 | ship(W320-codex-r2): sca-v8.1-partial -> sca-v9 stale-claim correction | **MINE** (codex r2 correction) | (no new dir; rubric-version-claim correction in 4 W320 ledger rows + CLAUDE.md) |

**Time-ordering note**: W324 commit `8e43c24` landed **3 minutes BEFORE** my W320 ship `5cac3ec` even though my W319-codex-r4 (`aee7240` 13:39:25 implied) was the parent. Parallel session reached commit-stage faster; mine had longer dispatch time (4-Agent parallel sweep). Git fast-forwarded my W320 onto W324 base because my work-tree had W324 as a clean upstream merge candidate.

---

## §2 PARALLEL session bundle — what `8e43c24` actually shipped

Per commit-msg footer (`[bundle: includes 5 pre-staged W320-B-MULTI-REPO-INGEST artifacts]`) and `git show --stat 8e43c24`, the **single commit `8e43c24` bundled FOUR waves' worth of work**: W321 + W322 + W323 + W324 all flushed in one ship. Wave-dir attribution:

| Wave-dir | Created in `8e43c24`? | Inferred parallel-session work-period |
|---|:---:|---|
| `W321-META-FOUNDATION-WAVE/` (8 stream docs: STREAM-1..8) | ✓ | Earlier in session |
| `W322-WAVE/CLOSURE-SYNTHESIS.md` | ✓ | Post-W321 re-dispatch |
| `W323-COMPREHENSIVE-AUDIT-WAVE/` (8 stream docs: STREAM-1..8) | ✓ | 8-stream parallel-Agent dispatch |
| `W324-WAVE/CLOSURE-SYNTHESIS.md` + P4 + P8 | ✓ | Final application + ship |
| `W320-B-MULTI-REPO-INGEST/` (5 artifacts) | ✓ (footer) | Pre-staged before W321 — likely from operator-provided W320 multi-repo handoff |

So W321 + W322 + W323 + W324 are **all parallel-session work** chronologically distinct but landed in **one atomic git commit**.

---

## §3 Files touched by `8e43c24` (parallel) and by `5cac3ec` (mine) — disjoint?

### Files touched by parallel-session `8e43c24` (sample, from `git show --stat`)

- `.claude/settings.json` (P5 + P8 paths; signed-audit-trails false flip)
- `.claude/skills/sota-convergence-audit/SKILL.md` (sca-v8.1-partial 1629 LOC → sca-v9 338 LOC; REWRITTEN inline)
- `.claude/skills/_archived/W324-pre-sca-v9/SKILL-sca-v8.1-partial.md` (git-mv archive of pre-rewrite SKILL.md)
- `.claude/skills/_archived/W324-deprecated/{addyosmani-api-and-interface-design,addyosmani-code-simplification,addyosmani-doubt-driven-development,addyosmani-frontend-ui-engineering,interview-me}/SKILL.md` (5 git-mv archives)
- `.claude/skills/learned/SKILL.md` (repaired from empty)
- `.claude/skills/gitnexus/SKILL.md` (created as umbrella router)
- `.mcp.json` (+14 lines — P5 tavily + exa)
- `harness/eval_harness.py` (+380 LOC additive — `_w324_*` helpers)
- `tools/test-msys-norm.mjs` (147→148 LOC, rewritten to `node:test`)
- `tools/mcp-eval-stub.mjs` (new, 33 LOC)
- `tools/planning-attest.ps1` (new, 1.0 KB)
- `mise.toml` (new, project-root)
- `docs/architecture/W324-WAVE/CLOSURE-SYNTHESIS.md` + `P4-GIT-PR-WORKFLOWS-INSTALL.md` + `P8-SLSA-VERIFIER-AND-SIGNED-AUDIT-DECISION.md`
- (entire W321 + W322 + W323 wave-dir tree)

### Files touched by my `5cac3ec` W320 ship

- `docs/architecture/W320-AUDIT-WAVE/` (4 files: STREAM-C-SYNTHESIS.md + W320-C-1-PWF-V2-38-1-RE-LITIGATE.md + W320-C-2-WSHOBSON-SECURITY-TRIAD.md + W320-C-3-PER-SUBAGENT-BUDGET.md)
- `docs/architecture/W320-CLOSURE-SYNTHESIS/` (2 files)
- `docs/architecture/W320-P0-CLOSURES/`, `W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/`, `W320-RUNTIME-FIXES/`, `W320-VENDOR-FORK-AND-CITE/`, `W320-WAVE/` (multiple stream docs each)
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` (+4 rows #89-#92 appended; **rule_version cited as `sca-v8.1-partial` per W319 baseline**)
- `CLAUDE.md` (status appendix grew; rolling-3-retention archive)
- `.claude/settings.json` (W320 P0 path additions — non-conflicting with W324 P5/P8 changes since different keys)

### Files touched by BOTH `8e43c24` and `5cac3ec` (potential conflict)

| File | Parallel change | Mine change | Conflict? |
|---|---|---|---|
| `.claude/settings.json` | P5 tavily+exa keys; P8 signed-audit-trails flip; mise-related env adds | W320 P0 closure path adds (uvx-related + plugin updates) | **NO** — different sections; git auto-merge resolved cleanly (my commit landed atop W324's settings.json without conflict per linear-history) |
| `CLAUDE.md` | Status block updates in W324 (CLOSURE-SYNTHESIS pointer) | Status appendix grew with W320 ship | **MAYBE-CONFLICT-AUTO-RESOLVED** — both modified status block; my commit's W320 status section appended AFTER W324's reference; auto-merge succeeded because edits were in different LOC regions |

**Verdict**: No git-level merge conflict. Conflict was at the **semantic-rubric-version-claim** level — my W320 ledger rows #89-#92 cited `sca-v8.1-partial` (the rubric live AT W319-codex-r4 baseline), but `8e43c24` had already shipped `sca-v9` 3 minutes earlier. This is the **stale-claim drift** my `1360aeb` codex-r2 commit subsequently corrected (citation footnote update only — no score re-computation).

---

## §4 Codex-rN rounds — who fired which?

| Codex round | Fired by | Commit | Verdict |
|---|---|---|---|
| W321 r1 → r2 → r3 | Parallel session | (bundled in `8e43c24`) | r3 APPROVE per W322 CLOSURE-SYNTHESIS:15 |
| W324 r1-r10 → r11 | Parallel session | (bundled in `8e43c24`) | r11 APPROVE per W324 CLOSURE-SYNTHESIS:4 |
| W320 r1 (provenance correction) | **MINE** | `e626cec` | settings.json claim-correction landed |
| W320 r2 (sca-v9 stale-claim) | **MINE** | `1360aeb` | Cite-corrected W320 rows #89-#92 to acknowledge sca-v9 supersession |

Parallel-session ran **multiple codex rounds** (W321 ×3 + W324 ×11 = 14 codex invocations) before shipping `8e43c24`. My W320 base ship `5cac3ec` had ZERO codex rounds pre-commit (codex hook auto-fires on `Stop` but `5cac3ec` was a multi-Agent dispatch that landed mid-session); operator-extended codex r1+r2 ran POST-ship to catch stale claims.

---

## §5 Branch / worktree state

- **Branch**: `main` (single linear history; no merges, no rebases between `aee7240` and `1360aeb`)
- **Worktree**: per CLAUDE.md L9 there are 3 worktrees (`Z:/claude-sota-installed-W272`, `-W273`, `-state/wt/w280`); the parallel session may have run from a different worktree but pushed to the same `main` branch (per W280d safety pattern, this is correct).
- **No --force-with-lease evidence** in commit graph; all 4 commits are clean fast-forwards.

---

## §6 Summary table — wave authorship

| Wave-dir | Author session | Commit | Status |
|---|---|---|---|
| `W319-*` (5 dirs: FOUNDATION-AUDIT + MULTI-REPO-INGEST + ORCHESTRATION-AUDIT + RESEARCH-ARCH + RUNTIME-CLEANNESS-V7) | MINE (pre-`aee7240` baseline) | upstream of `aee7240` | Closed pre-W325 |
| `W319-CLOSURE-SYNTHESIS/` | MINE | upstream of `aee7240` | Closed pre-W325 |
| `W320-*` (7 dirs: AUDIT-WAVE + CLOSURE-SYNTHESIS + P0-CLOSURES + RESEARCH-ARCHITECTURE-ENHANCEMENT + RUNTIME-FIXES + VENDOR-FORK-AND-CITE + WAVE) | MINE | `5cac3ec` + `e626cec` + `1360aeb` | Closed W325 |
| `W321-META-FOUNDATION-WAVE/` | PARALLEL | `8e43c24` (bundled) | Closed W324 |
| `W322-WAVE/` | PARALLEL | `8e43c24` (bundled) | Closed W324 |
| `W323-COMPREHENSIVE-AUDIT-WAVE/` | PARALLEL | `8e43c24` (bundled) | Closed W324 |
| `W324-WAVE/` | PARALLEL | `8e43c24` | Closed W324 |
| `W325-*` (current wave) | MINE (this stream) | (not-yet-committed) | OPEN |

---

## §7 Implications for W325 reconciliation

1. **No git-level conflicts to resolve** — linear history is clean.
2. **Semantic-rubric drift was caught and corrected** at `1360aeb` (rule_version cite-correction). However, my W320 ledger row **scores** still reflect sca-v8.1-partial **dimension weights** and **denoms** (28.3 / 12.9 effective for PWF; 30.7 / 13.6 for wshobson-triad). Under sca-v9, denoms expand to **33.7 / 14.5** (+5.4 install / +1.6 pattern) — re-computation MAY shift verdict tier. See `STREAM-B-W320-LEDGER-UNDER-SCA-V9.md` for the re-verify.
3. **Parallel session shipped open carry-overs** (W324 P4 partial + P5 env-pending + P7 GitNexus operator-gate + P8 slsa-verifier advisory). My W320 ship had ITS OWN carry-overs (W320 P0/P5/P7 partial — `bypassPermissions:true` sandbox half + shell defensive long-tail + CLAUDE.md cite-corrections). Cross-wave de-dup needed — see `STREAM-B-OPEN-ITEMS-RECONCILIATION.md`.
4. **No re-write of W324 docs** per goal-predicate ("immutable historical"); reconciliation is **append-only** at W325-MULTI-SESSION-RECONCILE/.

---

## §8 Cardinal-rule check (this commit-map doc)

- R1-R4 invariants: not affected (this is documentation only; no install / hook / subagent / behavior changes).
- R5 partial-hold: noted as 7-wave-convergent SHIP-BLOCKER carried forward to W325 — see `STREAM-B-OPEN-ITEMS-RECONCILIATION.md` §1.
- `self_invented_count: 0` HOLDS: no new self-invented rules/hooks/skills added.

---

## §9 Cites

- `git log --oneline aee7240..1360aeb` (4 commits enumerated)
- `git show --stat 8e43c24` (W324 META-FOUNDATION file-list + commit-msg footer)
- `docs/architecture/W324-WAVE/CLOSURE-SYNTHESIS.md` (parallel-session ship report)
- `docs/architecture/W322-WAVE/CLOSURE-SYNTHESIS.md` (W321 re-dispatch + W322 P-block disposition)
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` rows #89-#92 (W320 ledger rows under sca-v8.1-partial baseline)
- `docs/architecture/W320-AUDIT-WAVE/W320-C-1-PWF-V2-38-1-RE-LITIGATE.md` (W320 PWF audit scoring trace)
- `docs/architecture/W320-AUDIT-WAVE/W320-C-2-WSHOBSON-SECURITY-TRIAD.md` (W320 wshobson security-triad scoring trace)
