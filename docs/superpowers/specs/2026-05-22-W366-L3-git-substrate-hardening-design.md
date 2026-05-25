---
title: W366 L3 Git Substrate Hardening — Design
date: 2026-05-22
status: APPROVED-FOR-PLANNING
wave: W366 (next sequential; W365 in flight; W364 last shipped)
branch: feat/W366-git-substrate-hardening
worktree: Z:/claude-sota-installed-W366
approach: A (Substrate-first) per 2026-05-22 brainstorming session
scope: Full (Standard + W350 META-AUDIT carry-forwards + branch reconciliation)
branch_policy: Conventional Branch + migrate goal/ → feat/
authority_model: 3-org-distinct + Anthropic-docs-anchored hybrid (inherits V18 §1)
codex_cadence: r1 → rN until APPROVE; max r10 hard wall per V18 §11 R3
target_kpi: Lift L3 git foundation 2.0 → 4.0 per sca-rubric (Stream G headline)
source_audit:
  - docs/architecture/AUDIT-2026-05-21/STREAM-A-GIT-TREE.md (SEV-1 A1/A2; SEV-2 A3/A4; SEV-3 A5-A9)
  - docs/architecture/AUDIT-2026-05-21/STREAM-G-LAYER-SCORECARD.md (L3 = 2.0 lowest)
  - docs/architecture/AUDIT-2026-05-21/STREAM-E-LAYER-MODEL.md (7-layer ground-truth)
  - docs/architecture/W350-SOTA-GIT-TREE-AUDIT/META-AUDIT.md (F-A1/A3/A4 deferred)
brainstorming_session_decisions:
  - Q1 forward path → A (Substrate-first)
  - Q2 scope ladder → Full
  - Q3 branch policy → Conventional Branch + migrate goal/→feat/
  - Q4 design approval → Approved-write-spec
cite_anchors:
  - https://docs.anthropic.com/en/docs/claude-code/hooks
  - https://docs.anthropic.com/en/docs/claude-code/settings
  - https://github.com/deepakputhraya/action-branch-name (allowlist enforcer)
  - https://github.com/conventional-changelog/commitlint (custom rule SDK)
  - https://github.com/agbell/conventional-branch (prefix taxonomy)
---

# W366 — L3 Git Substrate Hardening

## §0. Context

This wave executes **Approach A (Substrate-first)** from the 2026-05-22 deep audit brainstorming session. The audit (7-stream landed 2026-05-21, untracked at `docs/architecture/AUDIT-2026-05-21/`) ranked L3 git foundation **2.0 / T3 — the LOWEST of 7 layers AND the substrate every other layer drifts on**. Stream G's per-layer sca-rubric scorecard independently reproduces the four-stream audit's priority: fix L3 first.

This wave does **not** advance the V18 research-arch payload (Approach B) nor adopt layer-keyed naming (Approach C). Those are future waves.

**Live state at wave-open (2026-05-22):**
- Canonical install dir HEAD: `w348-sota-fix-p5b` (10h-old, divergent from `w348-sota-fix`)
- 5 worktrees: `Z:/claude-sota-installed`, `…-W362a`, `…-W362bA`, `…-W362bB`, `…-W362c` (at cap=5)
- 13 local branches; 12 unmerged; 8 in-flight (W353→W362c), 4 likely-superseded
- W362c LIVE judging 85 panels (task #664 in_progress) — **NO TOUCH** policy
- Main HEAD: `c8b1d67` (PR #24 squash, W353 closure verdict) — branch-protection LIVE

## §1. Wave envelope

| Field | Value |
|-------|-------|
| Wave | **W366** |
| Spec slug | `2026-05-22-W366-L3-git-substrate-hardening-design` |
| Branch | `feat/W366-git-substrate-hardening` (Conventional Branch + wave-in-slug; mirrors W354/W355 lineage) |
| Worktree | `Z:/claude-sota-installed-W366` (P0 creates via `tools/eee.ps1 --Wave W366 --Slug git-substrate-hardening`) |
| Wave trailer | `Wave: W366` |
| Codex round tags | `w366-codex-r1` … `w366-codex-rN` (max r10 hard wall per V18 §11 R3) |
| Worktree cap impact | 5 active (W362a/bA/bB/c + W366) — at cap; no breach |

## §2. Acceptance bar (14 must-pass items)

1. **F1 closed**: `w348-sota-fix-p5b` reconciled with `origin/w348-sota-fix-p5b` — Phase 0 verifies actual divergence; rescue if `ahead > 0`
2. **F2 closed**: `goal/W356-research-arch-v19-evolution` and `feat/w355-codex-closure-and-installs` upstreams re-set to their `origin/…` counterparts; both pushed
3. **F4 closed**: `.github/workflows/branch-name-lint.yml` shipped — `deepakputhraya/action-branch-name@<sha-pinned-in-P2>` with `allowed_types=feat,fix,docs,style,refactor,test,chore,perf,build,ci` (Conventional Branch standard set) + Dependabot/Renovate exceptions
4. **F5 closed**: `commitlint.config.cjs` `wave-trailer-exists` custom rule added; bypass via `[WAVE-TRAILER-EXEMPT]` token in subject line
5. **F6 closed**: `docs/architecture/W350-sota-git-tree-finalization/` deleted (verified empty); sibling `W350-SOTA-GIT-TREE-AUDIT/` declared canonical
6. **F-A5 closed**: `git config` dups removed (`pull.rebase`, `push.useforceifincludes` reduced to single value each)
7. **F-A6 closed**: `56e13b5` vs `d5422ec` (claimed dup commit on p5b) investigated — drop one via `git rebase --interactive` IF (a) true content-dup AND (b) not yet pushed; ELSE document as known-twin
8. **F-A7 closed**: empty-dir delete (F6) + case-rename harmonization vs sibling — both same wave dir
9. **F-A8 documented**: merge commit `9104573` annotated one-off; CLAUDE.md footnote added at L19 area (worktree section already mentions rebase-not-merge)
10. **F-A9 closed**: `docs/standards/tag-naming-policy.md` published; live tag audit identifies conformance gap (no rewrite of existing tags — record only)
11. **Branch reconciliation**: `docs/architecture/W366-L3-GIT-SUBSTRATE/BRANCH-RECONCILIATION-VERDICTS.md` shipped with per-branch verdict; **operator-sign per branch before any delete**
12. **goal/ → feat/ migration**: dual-track during transition (archive-tag `archive/goal/<name>` + create `feat/<name>`); old name preserved for T6 basic-memory references
13. **Codex GPT-5.5 r1→rN APPROVE** on W366 ship (max r10 hard wall)
14. **Final commit**: gpg-signed + `Wave: W366` + `Codex-Verdict: APPROVE` trailers

## §3. Components — 9 deliverables

| C# | Path | Status | Notes |
|----|------|--------|-------|
| C1 | `.github/workflows/branch-name-lint.yml` | NEW | `deepakputhraya/action-branch-name@<sha-pinned-in-P2>`; triggers `pull_request` + `push`; allowlist = Conventional Branch types + dependabot + renovate |
| C2 | `commitlint.config.cjs` (modify) | EDIT | Add `wave-trailer-exists` custom rule; bypass token `[WAVE-TRAILER-EXEMPT]` |
| C3 | `docs/standards/branch-naming-policy.md` | NEW | Policy doc; goal/→feat/ migration guidance; per-prefix usage examples |
| C4 | `docs/standards/tag-naming-policy.md` | NEW | Tag patterns: `archive/<prefix>/<name>`, `<wave>-codex-r<N>`, `<wave>-ship`, `pre-<wave>-<topic>` |
| C5 | `docs/architecture/W366-L3-GIT-SUBSTRATE/BRANCH-RECONCILIATION-VERDICTS.md` | NEW | 12-row per-branch verdict table; operator-sign column; T6 cross-ref column |
| C6 | `docs/architecture/W366-L3-GIT-SUBSTRATE/SPEC.md` | NEW (copy of this) | Snapshot under wave dir for VERDICT-LEDGER cross-reference |
| C7 | `docs/architecture/W366-L3-GIT-SUBSTRATE/PLAN.md` | NEW (writing-plans phase) | Implementation plan from `superpowers:writing-plans` |
| C8 | `docs/architecture/W366-L3-GIT-SUBSTRATE/CODEX-VERDICT.md` | NEW | r1→rN findings + final APPROVE record |
| C9 | `docs/architecture/W350-sota-git-tree-finalization/` | DELETE | Empty-dir close-out |

## §4. Branch reconciliation table (12 unmerged → preliminary verdicts)

Live branch state at wave-open from `git for-each-ref --sort=-committerdate refs/heads/`:

| # | Branch | Last activity | Preliminary verdict | Action |
|---|--------|---------------|---------------------|--------|
| 1 | `w348` | (legacy bare-named) | ARCHIVE-TAG-AND-DELETE | `git tag archive/w348 w348 && git branch -D w348` |
| 2 | `w348-sota-fix` | (7 behind origin) | ARCHIVE-TAG-AND-DELETE | tag, delete |
| 3 | `w348-sota-fix-ledger` | (legacy) | ARCHIVE-TAG-AND-DELETE | tag, delete |
| 4 | `w348-sota-fix-p5b` | 10h (current HEAD!) | RESCUE → SQUASH-MERGE | P1 pushes if needed; P6 squash-merges to main if W353+W364 work isn't yet there |
| 5 | `goal/W348-carry-cleanup` | (legacy) | ARCHIVE-TAG-AND-DELETE | tag, delete |
| 6 | `feat/research-arch-v18-pipeline-foundation` | (W353 source) | ARCHIVE-TAG-IF-ON-MAIN | verify c8b1d67 supersedes; archive-tag if yes |
| 7 | `feat/w354-sota-install-wave` | (W354) | KEEP-OR-MERGE | check W354 completion status with operator |
| 8 | `feat/w355-codex-closure-and-installs` | 41 min | RESCUE-UPSTREAM (F2), KEEP | re-set upstream, push |
| 9 | `goal/W356-research-arch-v19-evolution` | 6 min | RESCUE-UPSTREAM (F2), KEEP, MIGRATE | re-set upstream, push, rename → `feat/W356-research-arch-v19-evolution` after C1 go-live |
| 10 | `goal/W357…W361` (5 branches) | recent | MIGRATE goal/→feat/ | batch rename in P6 |
| 11 | `goal/W362a/bA/bB/c` (4 branches) | 2026-05-21 | **KEEP-AS-IN-FLIGHT (W362c LIVE)**, MIGRATE on close | NO TOUCH to W362c branch/worktree until panels 85/85 done (task #664); rename others on wave close |
| 12 | `goal/W353-WAVE-CLOSE` | (W353) | ARCHIVE-TAG-IF-ON-MAIN | confirm c8b1d67 contains close, archive-tag |

**Hard rule: operator-sign required per branch before any delete operation.** No auto-delete even with verdict.

## §5. Implementation order (8 phases)

| Phase | Work | Gate |
|-------|------|------|
| **P0** | Worktree + branch + pre-flight | `tools/eee.ps1 --Wave W366` clean; live `git fetch --all` + state verification per branch |
| **P1** | **RESCUE** — push F1 if `ahead > 0`, fix F2 upstreams (W355/W356) via `git branch --set-upstream-to=origin/<name>`, back up BEFORE any rewrite | All in-flight branches have origin/ counterpart with `ahead == 0` |
| **P2** | Author C1+C2+C3+C4 in **test-mode** (warn-only, no PR block) | All 4 land green on test PR |
| **P3** | Author C5 reconciliation table; surface 12-row matrix for operator-sign | Operator approves verdict matrix |
| **P4** | F-A5 git config dedup + F-A6 dup-commit investigation + F-A7 case-rename + F6 empty-dir delete + F-A8 footnote + F-A9 tag-audit | All 6 items closed |
| **P5** | **Promote** C1+C2 from test-mode → **enforcing** (PR-required + commit-msg block) | New commits without `Wave: W<N>` trailer blocked (warn-only for 1 wave first, then promote) |
| **P6** | Execute reconciliation per operator-signed verdicts (archive-tag + delete OR squash-merge OR rename) | 12 branches resolved per verdict |
| **P7** | Codex r1→rN APPROVE; final commit + push; T6 basic-memory verdict-row write | Codex APPROVE + ship-verdict in T6 |

## §6. Testing

- **C1 branch-name-lint smoke test**: open dummy PR from `chore/test-W366-branch-lint` → action fires → reports green
- **C1 negative test**: open dummy PR from `bogus-prefix/foo` → action fires → reports red
- **C2 commitlint unit test**: `npx commitlint --from HEAD~1 --to HEAD` against (a) commit with trailer → 0 exit, (b) commit without trailer → non-zero exit, (c) commit with `[WAVE-TRAILER-EXEMPT]` → 0 exit
- **P1 RESCUE verification**: `git status` per branch shows `Your branch is up to date with 'origin/<name>'`
- **P4 git config**: `git config --get-all pull.rebase | wc -l` == 1; same for `push.useforceifincludes`
- **P6 branch reconciliation**: `git branch | wc -l` drops from 13 → expected target after deletes
- **End-to-end**: from clean clone, every gate fires correctly; codex r1 sees the spec + plan + 9 deliverables

## §7. Risks + mitigations

| Risk | Mitigation |
|------|-----------|
| R1: F1/F2 audit was stale; origin refs already exist | P0 verification first — `git fetch --all && git log origin/<branch>..HEAD` per branch; reconcile actual state vs Stream A claims; adjust ack-bar if rescue is no-op |
| R2: Wave-trailer hard-gate breaks WIP across other active worktrees (W362a/bA/bB/c, W365) | Warn-only for 1 wave (P2→P5 promotion deferred to W367 if needed); bypass marker `[WAVE-TRAILER-EXEMPT]` for docs-only commits |
| R3: goal/→feat/ migration breaks T6 basic-memory references | Preserve old name as `archive/goal/<name>` tag; cross-ref table in C5; T6 search can find either name |
| R4: F-A6 dup-commit drop rewrites public history if pushed | Skip rewrite if pushed; document as known-twin in CLAUDE.md footnote |
| R5: W362c LIVE judging breaks during reconciliation | KEEP-AS-IN-FLIGHT verdict — no touch to W362c branch or worktree until task #664 marks 85/85 done |
| R6: branch-name-lint blocks legitimate Dependabot/Renovate PRs | Allowlist `dependabot/` + `renovate/` per deepakputhraya defaults |
| R7: Codex round count exceeds 10 | Hard wall + operator escalate per V18 §11 R3 |
| R8: Branch-protection blocks W366 merge | PR + gpg-signed commits + CODEOWNERS — already supported (W353 verdict L60) |
| R9: W362c finishes during W366 execution | Defer W362c migration to W367 — no in-flight transitions |
| R10: deepakputhraya/action-branch-name SHA-pin unavailable / unmaintained | Fallback: own ~50-LOC workflow that lints via grep against allowed prefix regex |

## §8. Cardinal-rule compliance

- **CR-1**: deepakputhraya/action-branch-name cite-anchored to upstream release tag + SHA (looked up in P2)
- **CR-2**: New `.github/workflows/branch-name-lint.yml` is direct-CLI invocation via `uses: deepakputhraya/...`, not a project hook body
- **CR-3**: Codex review uses FQN `codex@openai-codex` plugin via `/codex:review` or `/codex:adversarial-review`
- **CR-4**: All behavior in CLAUDE.md + settings.json + commitlint.config.cjs; no self-invented `.claude/rules/*.md` introduced
- **CR-5**: Branch-protection (LIVE since W353) + commit-msg hook + branch-name-lint = layered safety per sca-v11 §6
- **CR-6 (verify-before-claim)**: Every claim cite-anchored to live `git config --get-all`, `git for-each-ref`, `git log --grep`, `ls`, deepakputhraya release tags; no fabricated SHAs

## §9. Success criteria

- [ ] All 14 acceptance-bar items closed (§2)
- [ ] 9 components shipped (§3)
- [ ] 12-row reconciliation matrix operator-signed per row (§4)
- [ ] 8 phases executed in order (§5)
- [ ] All §6 tests pass
- [ ] All §7 risks mitigated or accepted with documented rationale
- [ ] Codex r1→rN APPROVE on the W366 ship
- [ ] Final commit gpg-signed + `Wave: W366` + `Codex-Verdict: APPROVE` trailers
- [ ] **L3 git foundation re-scored 2.0 → 4.0** per sca-rubric (the headline KPI)
- [ ] `docs/architecture/AUDIT-2026-05-21/` dir promoted from untracked → archived as W366 evidence at `docs/architecture/W366-L3-GIT-SUBSTRATE/audit-evidence/`
- [ ] T6 basic-memory verdict-row written at `main/verdicts/w366/w366-l3-git-substrate-hardening-verdict`

## §10. Explicitly out of scope

- L4 CI/CD enforcement gaps (zizmor self-mask, provenance-lint dead, codeql advisory) — future wave
- L5 hooks CR-2 governance (~10 project-owned hook bodies, only 2 cite-sanctioned) — future wave
- V18 P1/P2 sota-research scaffold (F7 — directory missing) — future wave (Approach B)
- Layer-keyed naming migration (`git/`, `ci/`, `memory/` prefixes) — future wave (Approach C)
- W346/W347/W349 wave-debt ledger close-outs — separate carry-forward sweep
- W362c LIVE-judging — explicitly NO-TOUCH until panels 85/85 done
- T2 memory MCP / T3 cognee / T5 langfuse upgrades — handled in memory-tier waves
- New skill creation — this wave is git-substrate ONLY

## §11. References

**Anthropic primary:**
- [Hooks](https://docs.anthropic.com/en/docs/claude-code/hooks)
- [Settings](https://docs.anthropic.com/en/docs/claude-code/settings)

**Substrate enforcement:**
- [deepakputhraya/action-branch-name](https://github.com/deepakputhraya/action-branch-name)
- [conventional-changelog/commitlint](https://github.com/conventional-changelog/commitlint) + custom rule SDK
- [agbell/conventional-branch](https://github.com/agbell/conventional-branch) prefix taxonomy

**Local impl history (cite-anchored):**
- `docs/architecture/W350-SOTA-GIT-TREE-AUDIT/GIT-TREE-SOTA-ARCHITECTURE.md` (§1 branch-name-lint, §2 worktree-cap-5)
- `docs/architecture/W350-SOTA-GIT-TREE-AUDIT/META-AUDIT.md` (F-A1/A3/A4 deferred carry-forwards)
- `docs/architecture/AUDIT-2026-05-21/STREAM-A-GIT-TREE.md` (SEV-1 A1/A2; SEV-2 A3/A4; SEV-3 A5-A9)
- `docs/architecture/AUDIT-2026-05-21/STREAM-G-LAYER-SCORECARD.md` (L3 = 2.0/T3)
- `docs/architecture/W352-SOTA-CONVERGENCE-FOUNDATIONAL/DESIGN.md` (naming convention precedent)
- `docs/superpowers/specs/2026-05-21-research-arch-v18-consolidate-design.md` (V18 §11 codex round structure inherited)

**T6 memory references:**
- `main/verdicts/w353/w353-wave-closure-verdict-2026-05-21` (predecessor wave closure; carry-forwards reference)
- `main/practices/git/w348-autonomous-git-workflow-practice-verified-established`

## §12. Self-review notes

**Placeholder scan:** One intentional placeholder — `<sha-pinned-in-P2>` for the deepakputhraya action SHA. P2 looks it up against the latest release tag. Documented behavior, not a hidden TBD.

**Internal consistency:**
- §2 (14 items) ↔ §5 (8 phases) — every acceptance item maps to a phase
- §3 (9 components) ↔ §5 (8 phases) — every component lands in a specific phase
- §4 (12 branches) ↔ R5 (W362c NO-TOUCH) — explicit constraint
- §9 (success criteria) ↔ §2 (acceptance) — 1:1 superset (success criteria add KPI re-scoring + T6 write)

**Scope check:** Single implementation plan covers this. The branch reconciliation has the biggest variance (12 branches × unknown investigation depth), so the implementation plan should treat each branch as a sub-task with explicit pause-for-operator-sign checkpoints.

**Ambiguity resolved:**
- "warn-only for 1 wave" = P2 lands `level: warning` in commitlint config; P5 promotes to `level: error`. If W366 itself ships under the warning-only window, the spec is satisfied; W367 promotes.
- "dual-track during goal/→feat/ migration" = archive-tag + create new name + delete old name (3 steps, atomic per branch)
- "operator-sign per branch" = explicit ack message per branch in P3, recorded in C5 with operator signature column

**What this design WON'T fix that the audit surfaced:**
- All items in §10 — those are deferred to future waves (or are explicit non-goals)

---

**STATUS:** APPROVED. Next: invoke `superpowers:writing-plans` to produce the W366 implementation plan.
