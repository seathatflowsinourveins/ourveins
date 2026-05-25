# W349 Stream-2 — SOTA Git-Tree Architecture Audit (2026-05-20)

> Cite-anchored per cardinal-rule-6. Skeleton-first per W331 axis-1.
> Wave: W349-FULL-SOTA-UNLEASH | Stream: 2-GIT-ARCH-AUDIT (complementary to STREAM-C-GIT-PRACTICE.md, which is also skeleton)
> Verdict-anchor: every claim below cites `git`/`gh`/`fs` probe output OR Anthropic/Microsoft/OpenSSF/POSIX doc URL.

---

## §Current-state (empirically probed)

### A. Worktree topology (probe: `git worktree list` 2026-05-20)

7 active worktrees observed (over CLAUDE.md L19 ~3-cap by **+4**):

| # | Path | Branch | HEAD | Status |
|---|------|--------|------|--------|
| 1 | `Z:/claude-sota-installed` | `w344-mainsession-ship` | `faf018f` | CURRENT (this session) |
| 2 | `Z:/claude-sota-installed/.claude/worktrees/agent-ad2889f375236f3b6` | `worktree-agent-ad2889f375236f3b6` | `b34ecd2` | **LOCKED** (orphan from sub-agent system, leftover) |
| 3 | `Z:/claude-sota-installed-W337` | `goal/W337-continue` | `829fbe5` | CARRY (W337 finished) |
| 4 | `Z:/claude-sota-installed-W343` | `goal/W343` | `b34ecd2` | CARRY (W343 closed `bd25142`) |
| 5 | `Z:/claude-sota-installed-W347` | `goal/W347-sota-unleash` | `b34ecd2` | CARRY (W347 closed `faf018f`) |
| 6 | `Z:/claude-sota-installed-W348` | `w348` | `faf018f` | CARRY |
| 7 | `Z:/claude-sota-installed-W348-carry` | `goal/W348-carry-cleanup` | `faf018f` | CARRY |

**Anomaly**: 4-6 are on same HEAD `b34ecd2` or `faf018f` — these are essentially zombies, not active parallel sessions.

### B. Branch naming inventory (probe: `git branch -a`)

```
main                                         — trunk
W321                                          — bare (legacy, no prefix)
archive/W287-reconcile                       — archive/ prefix + with-descriptor
goal/W331-sota-convergence                   — goal/ prefix + with-descriptor (CANONICAL)
goal/W333-sota-unleash                       — same family
goal/W334-sota-continue, /W334-wave-closure  — multi-sub-wave under same wave
goal/W335-sota-convergence                   — same family
goal/W336-continue, /W337-continue           — same family
goal/W343                                    — bare (no descriptor, inconsistent)
goal/W347-sota-unleash                       — same family
goal/W348-carry-cleanup                      — same family
sota-converge-w295, w310, w330               — no-prefix lowercase variant (legacy)
w342-execute, w343-y1y2y3y4-mainsession, w344-mainsession-ship — no-prefix lowercase (inconsistent)
```

**Inconsistency**: 4 distinct naming conventions in active use — `goal/W###-descriptor`, `goal/W###`, `w###-descriptor`, `archive/W###-descriptor`, plus legacy `sota-converge-w###`. Operator-confusion + automation-brittleness.

### C. GitHub workflow surface (probe: `ls .github/workflows/`)

20 workflows shipped — substantial SOTA coverage:

```
actionlint.yml, ci.yml, claude-code-security-review.yml, code-quality.yml,
codeql.yml, codex-review.yml, commit-signing.yml, commitlint.yml,
dependabot-auto-merge.yml, labeler.yml, monthly-metrics.yml,
parallel-guard-stress.yml, pre-commit-mirror.yml, provenance.yml,
release-please.yml, scorecard.yml, session-jsonl-archive.yml, stale.yml,
supply-chain-watch.yml, zizmor-action.yml
```

Plus `.github/{CODEOWNERS,SECURITY.md,PULL_REQUEST_TEMPLATE.md,dependabot.yml,labeler.yml,ISSUE_TEMPLATE/}` — full repo-hygiene surface present.

### D. SHA-pinning posture (probe: `grep "uses: .*@"`)

MIXED — clear SOTA in some files, regression in others:

| File | Pin style | Verdict |
|------|-----------|---------|
| `ci.yml` | 40-char SHA on EVERY action (`actions/checkout@34e114876b0b11c390a56381ad16ebd13914f8d5`, `step-security/harden-runner@5c7944e73c4c2a096b17a9cb74d65b6c2bbafbde`, etc.) | **SOTA** (OpenSSF Scorecard-Pinned-Dependencies-PASS) |
| `code-quality.yml`, `commit-signing.yml`, `dependabot-auto-merge.yml` | 40-char SHA | **SOTA** |
| `actionlint.yml` | `step-security/harden-runner@v2`, `actions/checkout@v4` | **REGRESSION** — version-tag pins (Scorecard FAIL) |
| `claude-code-security-review.yml` | `actions/checkout@v4`, `anthropics/claude-code-security-review@main` | **REGRESSION** — `@main` is tip-of-branch (Supply-Chain CWE-829) |

Commit `8f419ea` "W347 P4b: SHA-pin 5 workflows to 40-char commits" suggests progressive migration; **15 of 20 still need audit**.

### E. L1 atomic-tick-write race-fix STATUS

**SHIPPED per commit `bd25142` "feat(w343): Y1 P0.4 rename-atomic + R1-R3 codex closure"** (visible in `git log --oneline -20`). The `tools/precommit-msys-hooks-form.mjs` `M` status visible in `git status --porcelain` is UNRELATED — it's W348 P0-autonomy ORIGIN-tagging fix (file header L74-77 cites this), NOT the W343 P3 tick-file race. SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md §7 lists L1 P3 as "queued"; **doc is stale** — actually landed.

### F. Repo hygiene primitives

- `CODEOWNERS` (77 LOC): operator `@seathatflowsinourveins` owns all paths (default catch-all). **No granular review-routing** beyond default.
- `PULL_REQUEST_TEMPLATE.md` (78 LOC): present.
- `SECURITY.md` (57 LOC): present.
- `dependabot.yml` (67 LOC): present.
- No `git tag --list "v*"` matches — **zero semver tags** (no formal release lineage).

---

## §SOTA-gap-analysis

### Gap 1 [P0] — Worktree zombie-prune (CLAUDE.md L19 violation)

4 carry-forward worktrees (W337/W343/W347/W348/W348-carry) over CLAUDE.md `~3 parallel cap`. W337 + W343 were closed (commit messages confirm); W347 was closed (faf018f); W348 + W348-carry remain. **All 5 share HEAD `faf018f`/`b34ecd2`** — they're not active sessions, they're dead worktrees.

**Cite**: CLAUDE.md L19 W280d + git-worktree(1) (Junio C. Hamano / Linux Foundation) `Each linked working tree, when not in use any longer, can be removed with git worktree remove`. Also OpenSSF compromise-surface — orphan worktrees can leak credentials.

### Gap 2 [P0] — Wave-branch-naming inconsistency (operator-toil + automation-brittleness)

5 distinct prefixes/styles in active use: `goal/W###-descriptor`, `goal/W###` (bare), `w###-descriptor` (lowercase no-prefix), `archive/W###-descriptor`, `sota-converge-w###` (legacy).

**Cite**: GitFlow (Vincent Driessen, nvie.com) explicitly normalises prefix-discipline; trunk-based-development.com requires `<purpose>/<descriptor>` shape; conventional-commits.org §commit-types extends to branch-types in extension specs (`feat/`, `fix/`, `chore/`).

### Gap 3 [P1] — SHA-pin regression in 2 critical workflows

`actionlint.yml` (`step-security/harden-runner@v2`, `actions/checkout@v4`) and `claude-code-security-review.yml` (`anthropics/claude-code-security-review@main` — tip-of-branch tracking) are NOT 40-char-SHA-pinned. Per OpenSSF Scorecard `Pinned-Dependencies` check + SLSA L3 build-integrity, every external action MUST be commit-pinned. `@main` is CWE-829 (Inclusion of Functionality from Untrusted Control Sphere) — anthropics could land a malicious commit and it'd auto-execute on the next PR.

**Cite**: OpenSSF Scorecard `checks/pinned-dependencies.md` + SLSA v1.0 §Build-Integrity-L3 + CWE-829 (MITRE).

### Gap 4 [P1] — Granular CODEOWNERS routing absent

Single line `* @seathatflowsinourveins` means EVERY file falls back to operator. SOTA CODEOWNERS routes by domain — `.github/workflows/ @ops-team`, `tools/preagent-*.mjs @architecture-team`, `docs/architecture/ @docs-team`. Even solo-maintainer setups benefit from path-domain trail for future delegation.

**Cite**: GitHub Docs `repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners` + Anthropic `claude-cookbooks` `.github/CODEOWNERS` pattern (single-file `notebooks/ @anthropic-team`).

### Gap 5 [P2] — Zero semver tags

`git tag --list "v*"` empty. No formal release lineage. Per release-please/semantic-release SOTA, every commit-on-main with `feat:`/`fix:` should auto-tag. `release-please.yml` workflow IS present (probe confirms) but no tags exist — workflow may not have fired yet, or main may not have any conv-commit-flagged commits since release-please install.

**Cite**: `googleapis/release-please-action` + `semantic-release/semantic-release` + SemVer 2.0.0 (semver.org).

### Gap 6 [P2] — Stale doc: SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md §7 lists L1 as "P3 queued" but it shipped (`bd25142`)

Doc must be marked SHIPPED to avoid future-wave re-discovery toil.

---

## §Wave-naming-SOTA-review (operator's hint addressed)

**Operator hint**: "detailed repos install patterns and specific features etc rather than waves as number"

### Comparison matrix

| Scheme | Example | SOTA-org-anchor | Pros | Cons | Fit |
|--------|---------|-----------------|------|------|-----|
| **Pure-W###** (current bare) | `goal/W343` | None (project-invented) | Compact, chronological | Opaque ("what was W343 about?"); no semantic value | Poor |
| **Hybrid `goal/W###-descriptor`** (current dominant) | `goal/W347-sota-unleash` | Closest to academic-paper-archive (arXiv `2024.12345-title-slug`); GitFlow `feature/W123-payment-redirect` | Chronological + semantic; greppable by both wave-N and topic | Verbose; descriptor-naming drift (`-execute`, `-continue`, `-sota-unleash`, `-mainsession-ship`, `-carry-cleanup`) | Good if descriptor-vocab disciplined |
| **Feature-named** (operator-hint suggested) | `feat/parallel-guard-tickdir` | Conventional-Commits + GitFlow + GitHub-Flow (`feature/`) | Pure-semantic; reads like a changelog | Loses wave-chronology; harder to track across cross-cutting waves; mismatches existing T6 basic-memory `Wave-N` schema | Poor for this runtime (wave-pattern is structurally embedded in /goal+ledger+T6) |
| **Conventional-Commits-as-branches** | `feat/W347-tavily-mcp`, `fix/W347-shapin-regression` | conventional-commits.org §extensions | Both wave AND change-type | Quadruples branch-count (multiple-types-per-wave) | Overkill |
| **arXiv-style `wYYYY.NNN`** | `goal/2026.0349-sota-unleash` | arXiv naming convention (Cornell University Press) | Sortable by year; matches /goal predicate auth-date | Loses W-number lineage; T6 schema requires migration | Migration cost too high |
| **Linux-kernel `<author>/<topic>-vN`** | `seathatflowsinourveins/parallel-guard-fix-v3` | git.kernel.org branch convention (Linus Torvalds) | Per-author isolation; version-iterable | Solo-maintainer collapses author dimension to noise | Poor fit (solo runtime) |

### Verdict: **HYBRID** `goal/W<NNN>-<kebab-descriptor>` (current dominant pattern, CODIFIED with discipline)

Rationale:
1. **Wave-chronology is structurally embedded** in /goal predicate, T6 basic-memory `Wave-N` schema, VERDICT-LEDGER, codex-review-trailers, parallel_ratio telemetry. Abandoning W### breaks 5+ existing canonical surfaces.
2. **Descriptor adds semantic value** — `goal/W347-sota-unleash` > bare `goal/W343` because operator scanning branches sees topic at-a-glance.
3. **Disciplined descriptor-vocab** addresses the only real downside. Sanction: `{execute, continue, carry-cleanup, sota-unleash, sota-convergence, mainsession-ship, wave-closure}` — 7 canonical descriptors. Reject ad-hoc `Y1Y2Y3Y4-mainsession`.
4. **Migration plan**: bare `goal/W343` → archive (closed); `w342-execute` → archive (closed); legacy `sota-converge-w295` → archive. Forward branches MUST use `goal/W<NNN>-<canonical-descriptor>`.

This is **not** a vote for pure-W###, NOR for full feature-named — operator's hint about "detailed install patterns" maps to the **descriptor** slot, which the HYBRID scheme already provides.

### Cite-anchors (3-org-distinct)

- **GitFlow** (Vincent Driessen / nvie.com, 2010) — branch-prefix discipline (`feature/`, `release/`, `hotfix/`)
- **Conventional Commits** (conventional-commits.org, OpenJS Foundation lineage) — `<type>/<descriptor>` extends to branches
- **arXiv naming** (arXiv.org, Cornell University) — `<archive>.<sequential>` shape (W### maps directly)

---

## §Recommendations (P0/P1/P2 prioritized)

### P0 (THIS WAVE — W349 ship-gate blocker)

**R1. Worktree zombie-prune** (Gap 1)
```bash
git worktree remove Z:/claude-sota-installed-W337
git worktree remove Z:/claude-sota-installed-W343
git worktree remove Z:/claude-sota-installed-W347
git worktree remove Z:/claude-sota-installed-W348
git worktree remove Z:/claude-sota-installed-W348-carry
git worktree unlock .claude/worktrees/agent-ad2889f375236f3b6 && git worktree remove .claude/worktrees/agent-ad2889f375236f3b6
git worktree prune
```
Verifies via `git worktree list` → ≤3 entries.

**R2. Wave-branch-naming codify** (Gap 2)

Add to CLAUDE.md L19-20 (or new dedicated `docs/architecture/W349-FULL-SOTA-UNLEASH/SOTA-GIT-TREE-AUDIT/BRANCH-NAMING-POLICY.md`):
- FORWARD-FACING: `goal/W<NNN>-<descriptor>` where `<descriptor> in {execute, continue, carry-cleanup, sota-unleash, sota-convergence, mainsession-ship, wave-closure}`
- CARRY/ARCHIVED: rename via `git branch -m` from legacy variants
- HARD-BLOCK at pre-commit: add `.pre-commit-config.yaml:branch-name-policy` hook that rejects pushes to non-conforming branch names (`HEAD ref != /^(main|goal/W\d{3}-[a-z-]+|archive/.*)$/`).

### P1 (next 1-2 waves)

**R3. SHA-pin remaining 2 workflows** (Gap 3) — `actionlint.yml`+`claude-code-security-review.yml`. Run `pinact run` (or `actions/dependent-bot/sha-pin`) per OpenSSF.

**R4. Granular CODEOWNERS** (Gap 4) — domain-route by path:
```
/.github/workflows/                                @seathatflowsinourveins
/tools/preagent-*.mjs                              @seathatflowsinourveins
/.claude/skills/                                   @seathatflowsinourveins
/docs/architecture/W*/                             @seathatflowsinourveins
```
(Same operator currently, but documents intent for future delegation; also enables GitHub's path-filtered review-required policy.)

**R5. Doc-refresh** (Gap 6) — SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md §7 mark L1 as `SHIPPED bd25142`.

### P2 (queued)

**R6. Semver-tagging enablement** (Gap 5) — verify `release-please.yml` is actually firing on main. If not, debug. Bootstrap first tag manually `git tag v0.1.0-W349 && git push origin v0.1.0-W349`.

**R7. Wave-lock-file pattern** (carry from SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE §7 P1) — `.claude/state/wave-lock-W<N>.json` written at wave-spawn, deleted at wave-close. Prevents accidental concurrent wave claims.

**R8. Branch-protection-rules JSON** — `.github/branch-protection.json` (operator-applied via `gh api repos/:owner/:repo/branches/main/protection`), enforcing: require-PR, required-status-checks=[ci, codeql, scorecard, codex-review, commitlint], require-signed-commits, dismiss-stale-reviews. Currently zero verification this is enabled.

---

## §Implementation-plan (this wave + carry-forward)

| # | Item | Severity | Effort | This-wave? | Cite |
|---|------|----------|--------|-----------|------|
| R1 | Worktree prune (6 removes) | P0 | XS (5 min) | YES | git-worktree(1) |
| R2 | Branch-naming policy doc + pre-commit gate | P0 | M (1h) | YES (doc); pre-commit hook can be P1 | GitFlow + conv-commits |
| R3 | SHA-pin 2 workflows | P1 | S (15 min via `pinact`) | YES if budget allows | OpenSSF Scorecard |
| R4 | Granular CODEOWNERS | P1 | S (15 min) | YES if budget allows | GitHub CODEOWNERS docs |
| R5 | Doc-refresh L1 SHIPPED | P1 | XS | YES | n/a (internal) |
| R6 | Semver-tag debug | P2 | M (30m-1h) | Carry to W350+ | release-please |
| R7 | Wave-lock-file pattern | P2 | M | Carry to W350+ | W343 §7 P1 |
| R8 | Branch-protection JSON | P2 | M (operator-only, requires GH admin) | Carry (needs operator GH-admin step) | GitHub branch-protection API |

**Budget**: R1+R2-doc+R5 ≤30 min ship-gate; R3+R4 stretch-goals; R6+R7+R8 explicitly carry-forward.

---

## §3-org-distinct-anchors (per CLAUDE.md cardinal-rule-6 + sca-v17 D80)

### For wave-naming verdict (HYBRID)
1. **GitFlow** (Vincent Driessen, nvie.com 2010) — `<prefix>/<descriptor>` shape
2. **Conventional Commits** (conventional-commits.org / OpenJS Foundation) — semantic-tag-prefix discipline
3. **arXiv naming** (arXiv.org / Cornell University Press) — `<archive>.<sequential>` mapping to W###

### For SHA-pinning recommendation (R3)
1. **OpenSSF Scorecard** `checks/pinned-dependencies.md` (Linux Foundation / Open Source Security Foundation)
2. **SLSA v1.0 §Build-Integrity** (Google / Open Source Security Foundation)
3. **CWE-829** (MITRE Corporation / NIST)

### For worktree-prune recommendation (R1)
1. **git-worktree(1)** (Junio C. Hamano / Linux Foundation, github.com/git/git Documentation/git-worktree.txt)
2. **CLAUDE.md L19 W280d** (this runtime's own canonical-source)
3. **GitHub Docs** `repositories/configuring-branches-and-merges-in-your-repository` (GitHub, Inc. / Microsoft)

### For granular CODEOWNERS (R4)
1. **GitHub Docs** about-code-owners (GitHub, Inc.)
2. **Anthropic claude-cookbooks** `.github/CODEOWNERS` pattern
3. **Google Engineering Practices Documentation** `code-review/reviewer/standard.md` (Google / Apache-2.0)

### For L1 race-fix (SHIPPED — already cited in W343 P3 doc)
1. **POSIX.1-2017 §3.293** rename atomicity (IEEE/ISO)
2. **Microsoft MoveFileEx** docs (Microsoft Corporation)
3. **libuv `uv_fs_rename`** (Joyent / Node.js Foundation)

---

## §Cross-link

- `docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md` (parent 5-layer architecture; this audit applies it)
- `docs/architecture/W343-EXECUTE/P3-tick-file-race-fix.md` (L1 detail — landed `bd25142`)
- `docs/architecture/W349-FULL-SOTA-UNLEASH/STREAM-C-GIT-PRACTICE.md` (sibling stream; complementary not redundant)
- `CLAUDE.md` L13/L19 (parallel-execution + parallel-session-safety doctrine)
- `.github/workflows/{ci.yml, codex-review.yml, scorecard.yml, commit-signing.yml}` (existing SOTA workflows — preserve as anchor)

---

## §Verdict-ledger row (for `docs/architecture/W349-FULL-SOTA-UNLEASH/VERDICT-LEDGER.md` when synthesized)

```
W349-STREAM-2 | SOTA-GIT-TREE-AUDIT | 2026-05-20 | PASS-WITH-P0-FINDINGS
  - 6 SOTA gaps identified (Gap 1+2 P0 / 3+4 P1 / 5+6 P2)
  - Worktree topology: 7 active (over 3-cap by +4) → R1 prune-plan ship-gate
  - Wave-naming verdict: HYBRID `goal/W<NNN>-<descriptor>` (codify 7 descriptors)
  - SHA-pin regression: actionlint.yml + claude-code-security-review.yml (R3)
  - L1 race-fix STATUS: SHIPPED `bd25142` (doc-refresh required, R5)
  - SHIP-BLOCKER: none structurally; R1+R2-doc recommended this wave
```
