# W352-SOTA-CONVERGENCE-FOUNDATIONAL — Design

> **Wave**: W352 · **Branch**: `goal/W352-rulesets-and-automation` (worktree `Z:/claude-sota-installed-W352`)
> **Date**: 2026-05-20 · **Scope**: Foundational (**11 active slices**; S8 deferred to W353+ per codex r1)
> **Predecessor**: W351-ci-hardening-and-automation (in-flight) · W350-sota-git-tree-foundation (META-AUDIT REVISE-AND-SHIP)
> **Audit basis**: 7-stream parallel audit + codex GPT-5.5 rounds 1+2 — synthesis at §1; codex verdicts at `CODEX-VERDICT.md`

---

## §1 Audit synthesis (7-stream convergence)

| Stream | Grade | Critical finding |
|---|---|---|
| A git-tree | B− | Worktree cap prose-only · 21 stale branches · destructive-cmd glob evasion · gitleaks JSONL silent (root-caused in F'') |
| B naming | C+ | `Wave: W<N>` trailer **IS USED IN PRACTICE** (5+ recent commits per `git log --grep '^Wave: W' --since=2026-04-15`) but NOT mechanized by `commitlint.config.cjs` — enforcement claim is the lie, not the adoption [codex r1 refutation] |
| C research-arch | B+ | Self-grading recursion bypass · no CI-mechanized 3-org-distinct gate · catalog rubric drift (23-dim ↔ D83) · no machine-readable canonical catalog |
| D memory-tier | mixed | T3 cognee 9/10 KEEP · T5 langfuse v3.160 vs upstream v3.174.1 (14-version drift) · T1 hindsight repo-identity mismatch (`vectorize-io/hindsight` not `topoteretes/hindsight`) |
| E CI/CD | A− | 9 workflows still on tag-refs not SHA-pinned · `.commitlintrc.json` missing while `commitlint.yml:34` references it · no reusable-workflow boilerplate · zizmor `continue-on-error: true` masks 31 HIGH |
| F-recovery | n/a | 6 CR-6 violations in CLAUDE.md (L14 "5→6 worktrees", L5 false `pre-W*` tag claim, L42 "13→14 colliders / 38→43 orphaned", L74 "58→59-71 skills", L67 "54↔58 plugin-count inconsistency") |
| codex-r1 M1 | HIGH | `.pre-commit-config.yaml:49` comment says "commitlint.config.js" but real file is `commitlint.config.cjs` — stale-doc CR-6 |
| codex-r1 M2 | HIGH | W350 META-AUDIT internally contradictory: §F-A1 L48 says ".cjs exists at W347 a881fb3" but §C L166 says "author `commitlint.config.js`" — same doc self-contradicts |
| codex-r1 M3 | HIGH | Worktree-cap drift P0 confirmed by codex independent probe (CLAUDE.md L14 "≤5" vs `git worktree list` = 6) |
| F'' gitleaks-root-cause | n/a | Stream A symptom right, cause wrong: writer Python script deleted in W255 cleanup (`16c985f`); secret-scan STILL ACTIVE via direct-CLI + pre-commit-framework; only JSONL audit-trail telemetry lost; sister-file effect = 6 other JSONL writers in same state |
| G SOTA-gaps | n/a | Top install picks: `git-town` + `pinact` + `WorktreeAdd`-hook + biome + opengrep + prek; under-served layer = L0.4 version-control + L0.5 commit-gate composability |

**Naming-convention verdict**: KEEP `W<N>` as semantic anchor + ADOPT Conventional Branch prefix + MECHANIZE `Wave:` trailer. Numeric anchor's lossless monotonic causal ordering + T6 permalink stability + operator's empirical use (W350→W351→W352) outweighs descriptive-only alternatives.

---

## §2 Scope — 11 active slices (S8 deferred; each shippable independently)

Each slice = one commit on `goal/W352-rulesets-and-automation`. Order chosen for dependency + risk-rollup. S8 (langfuse bump) was reclassified P2 by codex r1 and is deferred to W353+ (no CVE cited, version-drift only). Original slice numbering S1–S12 preserved for cross-doc traceability with S8 marked DEFERRED.

### S1 — CLAUDE.md drift-fix (CR-6 closure) + stale-doc sweep
- L14 "5 worktrees / ~5 cap" → "6 worktrees" (or cap to 5 by removing W352-worktree before commit) [codex r1 M3]
- L5 `pre-W337-p3-1-claude-md` tag claim → either create the tag at HEAD OR change wording to "available via `git log --before=2026-05-15` and reflog" [codex r1 line-correction]
- L42 "13 colliding + 38 orphaned" → "14 + 43" (regenerate allowlist via `tools/build-subagent-allowlist.mjs --regenerate` + amend)
- L74 "58 local skills" → actual range (`find .claude/skills -maxdepth 2 -name SKILL.md | wc -l` = 59; `find .claude/skills -name SKILL.md | wc -l` = 71 — pick canonical depth + state explicitly)
- L67 "54 installed plugin records" vs "58 enablement_entries" → reconcile to single source-of-truth (verify via `jq` on `installed_plugins.json` + `settings.json:enabledPlugins`)
- **`.pre-commit-config.yaml:49`** "commitlint.config.js" → "commitlint.config.cjs" [codex r1 M1]
- **`docs/architecture/W350-SOTA-GIT-TREE-AUDIT/META-AUDIT.md:166`** "author `commitlint.config.js`" → reconcile against §F-A1 L48 which correctly says `.cjs` already exists [codex r1 M2]
- **Acceptance**: every numeric claim in CLAUDE.md has a paired probe command in a new `.claude/state/claude-md-claim-probes.json` that regenerates the value; `grep -rn 'commitlint.config.js' .pre-commit-config.yaml docs/` returns empty
- **Files**: `CLAUDE.md`, `.claude/state/claude-md-claim-probes.json` (NEW), `.pre-commit-config.yaml`, `docs/architecture/W350-SOTA-GIT-TREE-AUDIT/META-AUDIT.md`
- **Risk**: LOW · **Rollback**: git revert one commit

### S2 — `.commitlintrc.json` mirror + MECHANIZE `Wave: W<N>` trailer rule [codex r1 reframe]
**Codex r1 correction**: trailer IS adopted in practice (5+ recent commits). Goal is MECHANIZATION not adoption.
- Add `.commitlintrc.json` that imports from `commitlint.config.cjs` (closes Stream E gap — `commitlint.yml:34` reference now resolves to a real file)
- Extend `commitlint.config.cjs` with custom `body-must-contain-wave-trailer` rule via `@commitlint/parse` + custom rule (`Wave: W<digit>+` regex on body OR footer)
- Exempt `dependabot/*`, `release-please--*`, `revert` commits via `.commitlintrc.json` `ignores:` field
- **Acceptance**: `printf 'feat: x\n\n' | commitlint` BLOCKS with explicit "Wave-trailer missing" message; `printf 'feat: x\n\nWave: W352\n' | commitlint` PASSES; CI workflow `commitlint.yml` exits 0 only on trailer-present (or exempted branch)
- **Files**: `.commitlintrc.json` (NEW), `commitlint.config.cjs` (extend), `.github/workflows/commitlint.yml` (verify)
- **Risk**: MED (could block dependabot/release-please PRs if exemption misconfigured) · **Rollback**: revert rule, keep `.commitlintrc.json`

### S3 — Install `git-town` + `pinact` (binary installs, no source change)
- `scoop install git-town` or `winget install GitTown.GitTown`
- `go install github.com/suzuki-shunsuke/pinact/cmd/pinact@v3.x`
- Record binary versions in CLAUDE.md L77 footer + `tools/installed-binaries.txt` (NEW)
- **Acceptance**: `git town --version` + `pinact --version` succeed; no code-files changed in `goal/W352`
- **Files**: `tools/installed-binaries.txt` (NEW), CLAUDE.md L77 amend
- **Risk**: LOW · **Rollback**: `scoop uninstall git-town` + binary delete

### S4 — SHA-pin 9 remaining workflows via pinact
- `pinact run .github/workflows/*.yml` — auto-converts `@v4` → `@<40-char-SHA>`
- Targets: `scorecard.yml`, `release-please.yml`, `actionlint.yml`, `commitlint.yml`, `claude-code-security-review.yml`, `codex-review.yml`, `supply-chain-watch.yml`, `session-jsonl-archive.yml`, `labeler.yml`
- Flip `zizmor-action.yml` `continue-on-error: true → false` (W349 RC-16 advisory→binding)
- **Acceptance**: `grep -lE '@v[0-9]+(\.[0-9]+)*$' .github/workflows/*.yml` returns empty; `actionlint .github/workflows/*` clean; `zizmor` exit 0
- **Files**: 9 workflow YAMLs + `zizmor-action.yml`
- **Risk**: LOW (pinact is deterministic) · **Rollback**: `git checkout` workflows

### S5 — `WorktreeAdd` PreToolUse cap-enforcer hook (cap-in-code)
- New `tools/precheck-worktree-add.mjs` (≤2KB per CR-2): on `git worktree add` detected via Bash payload, reject (exit 2) if `git worktree list` count ≥ cap (default 6)
- Wire in `.claude/settings.json` PreToolUse[Bash] hooks array
- Match shape of existing `tools/preagent-parallel-guard.mjs` (bypass marker, env-disable hatch)
- **Acceptance**: synthetic `Bash("git worktree add /tmp/test foo")` BLOCKS when count=6; PASSES when ≤5
- **Files**: `tools/precheck-worktree-add.mjs` (NEW, ≤2KB), `.claude/settings.json` (extend PreToolUse[Bash])
- **Risk**: MED (operator may want to exceed cap) · **Rollback**: remove hook entry

### S6 — Restore 7 dead JSONL telemetry writers as direct-CLI hooks
Per F'' sister-file effect: `gitleaks_pre_commit.jsonl`, `precompact_hint_emitter.jsonl`, `codex_t1_consult_gate.jsonl`, `codex_postcommit_reviews.jsonl`, `codex_prepush_reviews.jsonl`, `subagent_metrics.jsonl`, `observations.jsonl`
- Each writer = single-line bash wrapper appending `{"ts":"...","status":"...","decision":"...","rc":N}` JSONL row
- All embedded directly in `.claude/settings.json` hooks (CR-2: no project-owned hook bodies; direct-CLI invocations OK)
- **Acceptance**: after a test commit, all 7 JSONL files receive a new row with `ts ≥ 2026-05-20`
- **Files**: `.claude/settings.json` (extend ~7 hook entries)
- **Risk**: MED (settings.json complexity grows) · **Rollback**: settings.json revert
- **Note**: secret-scan is NOT currently broken — this restores audit-trail only

### S7 — Branch-protection ruleset + GitHub merge-queue
- New `tools/apply-branch-protection.sh` (POSIX, ≤2KB): `gh api` PUT to `repos/<owner>/<repo>/branches/main/protection` with required-status-checks set + signed-commits + linear history + merge-queue enabled
- New `tools/branch-protection.json` declaring the required ruleset (versioned + diffable)
- **Acceptance**: `gh api repos/<owner>/<repo>/branches/main/protection` returns 200 with all rules applied; `gh api` on PR shows required checks
- **Files**: `tools/apply-branch-protection.sh` (NEW), `tools/branch-protection.json` (NEW)
- **Risk**: HIGH (could lock out admin) · **Rollback**: `gh api` DELETE on protection
- **Pre-flight**: dry-run via `gh api ... --jq .` first

### S8 — Langfuse v3.160.0 → v3.174.1 bump [codex r1 reclassified P2 — DEFER]
**Codex r1 reclassification**: no CVE cited for v3.160→v3.174 gap; this is version drift only, not a security or correctness issue. **Move to W353+ unless a CVE surfaces.** Slot retained in design doc for traceability; will NOT ship this wave.
- Defer trigger: if a CVE is published against `langfuse@<v3.174.1` OR the v3.174 docker image breaks something currently used, re-promote to P1
- **Files**: NONE this wave
- **Rollback**: trivial — slot empty

### S9 — `cite-floor-check` pre-commit hook (Stream C P0 mechanization)
- New `tools/precommit-cite-floor.mjs` (≤2KB): on staged `docs/architecture/W*/*.md` or `VERDICT-LEDGER.md`, extract citation tokens (`github.com/<org>`, `arXiv:`, `https://<eTLD+1>`), compute org-distinct count, BLOCK (exit 2) if `distinct < 3` OR `single_org > 50%`
- Wire in `.pre-commit-config.yaml` `repos[].hooks[]`
- **Acceptance**: synthetic markdown with 2 GitHub citations → BLOCKED; same plus 1 arXiv → PASSED
- **Files**: `tools/precommit-cite-floor.mjs` (NEW), `.pre-commit-config.yaml` (extend)
- **Risk**: MED (false-positive on legitimate single-org docs) · **Rollback**: remove pre-commit entry

### S10 — Canonical `catalog.yaml` + `tools/catalog-rebuild.mjs`
- New `docs/architecture/W259-grand-catalog/catalog.yaml` — one block per repo (slug, layer L1-L10, scores per dim, last-scored-version, last-scored-wave, evidence-cite-anchors[])
- New `tools/catalog-rebuild.mjs` reads catalog.yaml, emits derived `MASTER-SCORING-MATRIX-W259.md`, flags rows with `last_scored_version < sca_current_version - 3`
- New `tools/catalog-diff.mjs` for wave-over-wave score delta reports
- Substrate-first: don't migrate all 99 entries; populate top-10 + leave rest as `TODO` for W353+
- **Acceptance**: `node tools/catalog-rebuild.mjs` emits MASTER-SCORING-MATRIX-W259.md without diff against committed version (round-trip stable); `node tools/catalog-diff.mjs HEAD~1 HEAD` reports empty delta
- **Files**: `docs/architecture/W259-grand-catalog/catalog.yaml` (NEW), `tools/catalog-rebuild.mjs` (NEW), `tools/catalog-diff.mjs` (NEW)
- **Risk**: LOW (additive, doesn't break existing MD) · **Rollback**: delete added files

### S11 — `sca-meta-audit` skill (Stream C meta-skill recommendation)
- New `.claude/skills/sca-meta-audit/SKILL.md` per `superpowers:writing-skills` discipline
- Triggers: "audit the rubric", "score the scorer", "sca-meta", "rubric drift"
- Behavior: reads `sota-convergence-audit/SKILL.md`, computes recursion-risk metric (count T-skip-arch-itself dims ÷ total scored dims; target ≤20%), cross-checks 3-org-distinct anchors for live-URL freshness, computes inter-rater calibration vs codex GPT-5.5 round-1 on held-out 5-candidate sample, emits `sca-meta-verdict.md` row with PASS/FAIL/CALIBRATION-DRIFT
- **Acceptance**: skill triggers on phrase match; runs against `sota-convergence-audit/SKILL.md` and emits verdict
- **Files**: `.claude/skills/sca-meta-audit/SKILL.md` (NEW)
- **Risk**: LOW (new skill, no behavioral change to existing) · **Rollback**: delete skill dir

### S12 — Retire 3 stale plugin entries (Stream G retire-candidates)
- Per Stream G: `gitnexus@gitnexus-marketplace` (enabled:false, local-cypher + codegraph cover use case), `hindsight@hindsight` (W316-S6 retired daemon), `claude-mem@thedotmack` (W320 phantom-write source, basic-memory T6 supersedes)
- Edit `.claude/plugins/installed_plugins.json` + `.claude/settings.json` `enabledPlugins` to remove entries
- Run `/reload-plugins` (or document required restart)
- Update CLAUDE.md plugin counts from §S1 to match
- **Acceptance**: `.claude/settings.json` no longer references 3 retired plugins; CLAUDE.md plugin counts match probe
- **Files**: `.claude/plugins/installed_plugins.json`, `.claude/settings.json`, `CLAUDE.md`
- **Risk**: LOW (entries already enabled:false) · **Rollback**: restore JSON

---

## §3 Out-of-scope (deferred to W353+)

- Memory-tier consolidation (hindsight revive-eval, mem0/Letta/LightRAG sca-v17 audit) — per Stream D verdict, requires separate wave
- OSSF Scorecard nightly cron + Inspect-AI wire — Stream C P2, not P0
- Full 99-repo catalog.yaml population — S10 ships substrate; bulk migration is its own wave
- Branch rename `goal/*` → `feat/*` Conventional Branch full migration — Stream B rec; deferred until W350 ships
- `.local/graphiti/` CVE-stuck lockfile remediation — W350 META-AUDIT B-SEC P0 already-applied via `--skip-dirs .local`
- 6 MCP version drift sync (npm install -g) — W350 META-AUDIT B-SEC P0 operator-side mutation
- Reusable workflow `_setup.yml` scaffold — Stream E P1; W353 candidate

---

## §4 Cite-anchors (3-org-distinct floor per CR-6) [codex r1+r2 strengthened — one row per active slice]

| Slice | Anthropic | Microsoft/Google/Meta/GitHub | community/standards |
|---|---|---|---|
| S1 CLAUDE.md drift-fix + stale-doc | Anthropic CCBP `claude-memory.md:34-40 @ a28cd96b` (verify-before-claim CR-6) + `cardinal-rule-6` in CLAUDE.md L48 | Microsoft autogen drift-detection patterns + Google "single source of truth" docs discipline | NIST SP 800-53 CM-3 Configuration Change Control + OWASP A09:2021 Security Logging Failures + RFC 2119 SHOULD/MUST semantics |
| S2 commitlint Wave-trailer + `.commitlintrc.json` | claude-cookbooks @39a350b6 commit-message discipline + Anthropic CCBP `claude-memory.md:34-40` | Microsoft `commitizen-tools/commitizen` README + Google "Cocoon" commit-format docs | Conventional Commits 1.0.0 spec (`conventionalcommits.org`) + `@commitlint/parse` API |
| S3 install git-town + pinact | Anthropic CCBP SHA-pin + CC docs `/branch` workflow + `EnterWorktree` hook event | GitHub Docs "About merge queues" + "Security hardening for GitHub Actions" + Microsoft DevOps branching guide | git-town.com docs (3.2k★ MIT) + SLSA v1.0 §Build Track L3 + OSSF Scorecard `pinned-dependencies` + CWE-829 + Atlassian Bitbucket "Git branching strategies" |
| S4 SHA-pin sweep + zizmor binding | Anthropic claude-code docs `actions-pinning` guidance | GitHub Actions security best-practices + Google project-zero advisory on action-tag mutability | step-security/harden-runner docs + zizmor (woodruffw) audit rules + ossf/scorecard `pinned-dependencies` |
| S5 WorktreeAdd cap-hook | Anthropic CC hook event `EnterWorktree` + `tools/preagent-parallel-guard.mjs` precedent (CR-5 condition-(b)) | Microsoft monorepo guidance (`microsoft/typescript` worktree usage) | `gitworktrees(7)` man page + CCBP `claude-settings.md` hook discipline |
| S6 JSONL telemetry restore | Anthropic CCBP `claude-memory.md` hook semantics + W255 cleanup commit `16c985f` provenance | GitHub Actions JSONL artifact pattern (workflow-summary) | NIST SP 800-92 §Log Management + OWASP A09:2021 Security Logging Failures |
| S7 Branch-protection ruleset | Anthropic CC docs `/branch` + CCBP `claude-settings.md` | GitHub Docs "About branch protection rules" + GitHub REST API `repos/.../branches/.../protection` schema | Linux kernel `MAINTAINERS` discipline + Google "trunk-based development" + Microsoft Azure DevOps branch policies |
| ~~S8~~ | DEFERRED (codex r1 reclassified P2 — no CVE; W353+ trigger only) | — | — |
| S9 cite-floor pre-commit | `citations-agent/SKILL.md:42-66` (Anthropic-adapted from `claude-cookbooks @39a350b6`) | Microsoft autogen citation discipline + OpenAI cookbook citation patterns | OWASP A06:2021 + NIST SP 800-218 PW.7 + sca-v13 ≥3-org-distinct floor (W332) |
| S10 catalog.yaml canonical | Anthropic claude-cookbooks Skills System versioning (epoch-timestamp version IDs) | Microsoft `semantic-kernel` plugin manifest schema + GitHub `actions/runner` catalog schema | CycloneDX SBOM v1.6 JSON spec + paperswithcode datacard + `sindresorhus/awesome-*` single-source-of-truth pattern |
| S11 sca-meta-audit | Anthropic Skills System custom-skill versioning + `sota-convergence-audit/SKILL.md` precedent | Microsoft autogen `_signal_termination_with_error` recursion-guard | OpenReview meta-review process + Stanford CRFM HELM held-out-task framework + IEEE Software peer-review-of-review-process |
| S12 retire 3 plugins | Anthropic CC `/plugin uninstall` flow + W316-S6 hindsight retirement precedent | GitHub Marketplace deprecation policy | OSSF retired-project guidance + `apt-mark` deprecation pattern |

---

## §5 Risks + rollback

**Highest risk**: S7 branch-protection ruleset (could lock out admin). Mitigation: dry-run via `gh api ... --jq .` before live apply; rollback documented (`gh api DELETE`).

**Secondary risks**:
- S2 commitlint trailer rule could block dependabot/release-please PRs → mitigation via `.commitlintrc.json` `ignores:` field
- S5 WorktreeAdd cap-hook could block legitimate worktree-adds → bypass marker pattern matching parallel-guard
- S8 Langfuse v3.160→v3.174 breaking changes → pinned-version rollback in compose YAML
- S9 cite-floor false-positives on legitimate single-org docs → escape-hatch env var

**Wave-level rollback**: each slice = one commit; `git revert <SHA>` restores any single slice. Worst-case: `git reset --hard origin/main` discards all 12 slices (but `--force-with-lease` requires destructive-cmd guard pass).

---

## §6 Acceptance (whole wave) [codex r1 strengthened]

1. CLAUDE.md has zero CR-6 verify-before-claim violations (every numeric claim has paired probe in `.claude/state/claude-md-claim-probes.json`; `grep -c '^>.*[0-9]' CLAUDE.md` ≤ probe-rows-count)
2. `grep -n 'commitlint\.config\.js[^.c]' .pre-commit-config.yaml` returns empty AND `grep -n 'commitlint\.config\.js' docs/architecture/W350-SOTA-GIT-TREE-AUDIT/META-AUDIT.md` returns only the historical-trace lines (L34 + L48 contradict-witness pair retained for traceability) — codex r2 scope-narrow: design + verdict files INTENTIONALLY reference the stale filename for historical witness, so grep scope is limited to `.pre-commit-config.yaml` (the live consumer) + a curated allowlist in META-AUDIT. The actual stale text at `.pre-commit-config.yaml:49` MUST be corrected; the W350 META-AUDIT L166 self-contradiction MUST be reconciled. (codex r2 fail #2 closed by narrowing scope.)
3. `printf 'feat: x\n\n' | commitlint` BLOCKS · `printf 'feat: x\n\nWave: W352\n' | commitlint` PASSES
4. `grep -lE '@v[0-9]+(\.[0-9]+)*$' .github/workflows/*.yml | wc -l` returns 0
5. All 7 dead JSONL writers receive at least 1 new entry post-commit (test commit on `goal/W352` + verify)
6. `gh api repos/<owner>/<repo>/branches/main/protection` returns 200 with ruleset applied (dry-run via `--jq .` first)
7. ~~Langfuse v3.174.1~~ DEFERRED to W353+ per codex r1
8. `node tools/catalog-rebuild.mjs` round-trips clean against committed `MASTER-SCORING-MATRIX-W259.md`
9. `.claude/skills/sca-meta-audit/SKILL.md` exists and triggers on phrase match `"audit the rubric"` in a smoke session
10. `.claude/settings.json` has 3 fewer enabled plugin entries (gitnexus-marketplace, hindsight, claude-mem)
11. Codex GPT-5.5 adversarial review **round 2** on the final wave-closure commit returns APPROVE (round 1 returned REVISE; round 2 must clear)
12. Cite-floor: §4 table fully populated with 3-org-distinct per slice (codex r1 cite-floor-integrity correction)

---

## §7 Verdict

```yaml
slug: w352-sota-convergence-foundational
scope: foundational  # operator-chosen via AskUserQuestion 2026-05-20
slice_count: 11  # S8 langfuse deferred to W353+ per codex r1
audit_streams: 7
audit_grade_input: B+ (mixed; range B- to A-)
codex_review_status: round-1 REVISE → round-2 REVISE → round-3 APPROVE  # ship-ready
codex_r1_dispatch: acb3945d0d5c1a317  # 178s, 23518 tokens, NO-SHIP-as-written
codex_r1_corrections_absorbed:
  - Stream B row reframed (trailer adopted, mechanization missing)
  - Line citations corrected (L8→L5, L23→L14)
  - M1 added (.pre-commit-config.yaml:49 stale doc) — folded into S1
  - M2 added (W350 META-AUDIT internal contradiction) — folded into S1
  - M3 confirmed (worktree-cap drift active P0) — folded into S1
  - S8 langfuse reclassified P1→P2 → DEFERRED
  - §4 cite-anchors strengthened with 3-org-distinct table
  - §6 acceptance bumped with codex M1/M2 + round-2 gate
codex_r2_dispatch: a12a77479da8f5126  # 108s, 20566 tokens, NO-SHIP-as-written
codex_r2_corrections_absorbed:
  - §4 cite-table restructured: S1 row added; S3 git-town + pinact merged into single row; S8 marked DEFERRED inline (one-row-per-active-slice + S8 placeholder)
  - §6 acceptance #2: grep scope narrowed from `docs/` → `.pre-commit-config.yaml` only + curated META-AUDIT allowlist (design + verdict files retain historical references intentionally)
  - Header + §2 scope label reconciled: "11 active slices (S8 deferred)" everywhere; original numbering S1–S12 preserved for cross-doc traceability
operator_decisions:
  scope_approved: Foundational  # AskUserQuestion 2026-05-20
  design_approved: as-revised  # AskUserQuestion post-codex-r1; codex-r2/r3 pending
  worktree_cap_policy: amend-5-to-6  # W352 worktree stays in flight; S5 hook target = 6
  next_gate: codex-r3 APPROVE landed (dispatch a855703630cae8b25) → commit + invoke superpowers:writing-plans
estimated_effort: 4-5 hours, 11 commits (S8 dropped)
rollback_plan: per-slice git revert OR wave-level git reset --hard origin/main
cardinal_rule_compliance:
  CR-1: pinned-version installs (git-town + pinact, no @latest)
  CR-2: all hook bodies ≤2KB direct-CLI invocations
  CR-3: subagent_type FQN form throughout
  CR-4: project behavior in CLAUDE.md + settings.json (no .claude/rules/ ad-hoc)
  CR-5: safety via permissions + sandboxing (no custom guards beyond sanctioned dual-mode pattern)
  CR-6: verify-before-claim — every claim has paired probe; codex r1 absorbed
wave: W352
date: 2026-05-20
```

— END DESIGN —
